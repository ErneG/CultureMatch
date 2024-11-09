import re
import os
import json
from typing import List
import boto3

import numpy as np
from sklearn.preprocessing import normalize


class SageMakerEmbeddings:
    def __init__(self) -> None:
        self.newline = "\n"
        self.bold = "\033[1m"
        self.unbold = "\033[0m"
        self.embedding_endpoint = os.environ["SGM_EMBEDDING_ENDPOINT"]

    # Query SageMaker endpoint running text-embedding-091005
    def query_endpoint(self, encoded_text):
        client = boto3.client("runtime.sagemaker")
        response = client.invoke_endpoint(
            EndpointName=self.embedding_endpoint,
            ContentType="application/x-text",
            Body=encoded_text,
            Accept="application/json;verbose",
        )
        return response

    # Parse response from text-embedding-091005
    def parse_response(self, query_response):
        model_predictions = json.loads(query_response["Body"].read())
        embedding, model_output = (
            model_predictions["embedding"],
            model_predictions["model_output"],
        )
        return embedding, model_output

    def embeddings_batch(self, input_texts: List[str]):
        """
        Generate embeddings for a batch of input texts.

        Args:
            input_texts (List[str]): A list of input texts for which embeddings need to be generated.

        Returns:
            List[Any]: A list of embeddings, where each element corresponds to the embedding of an input text.

        Example:
            embeddings = self.embeddings_batch(["Hello world", "How are you?"])
            print(embeddings)
        """

        # Generate embedding for each text of the input
        embeddings = []
        for sentence in input_texts:
            try:
                query_response = self.query_endpoint(sentence.encode("utf-8"))
            except Exception as e:
                if e.response["Error"]["Code"] == "ModelError":
                    raise Exception(
                        "Backend scripts have been updated in Feb '22 to standardize response "
                        "format of endpoint response."
                        "Previous endpoints may not support verbose response type used in this notebook."
                        f"To use this notebook, please launch the endpoint again. Error: {e}."
                    )
                else:
                    raise
            try:
                embedding, model_output = self.parse_response(query_response)
            except KeyError as e:
                raise Exception(
                    "Backend scripts have been updated in Feb '22 to standardize response "
                    "format of endpoint response."
                    "Response from previous endpoints not consistent with this notebook."
                    f"To use this notebook, please launch the endpoint again. Error: {e}."
                )

            # print(
            #     f"{self.bold}Inference{self.unbold}:{self.newline}"
            #     f"{self.bold}Input text sentence{self.unbold}: '{sentence}'{self.newline}"
            #     f"{self.bold}The first 5 elements of sentence embedding{self.unbold}: {embedding[:5]}{self.newline}"
            #     f"{self.bold}Sentence embedding size{self.unbold}: {len(embedding)}{self.newline}"
            # )

            embeddings.append(embedding)

        # Normalization before inner product
        embeddings = normalize(
            np.array(embeddings),
            axis=1,
        )
        return embeddings

    def embeddings_similarity(self, input_texts: List[str], query: str):
        """
        Calculate the similarity between a query and a list of input texts based on their embeddings.

        Args:
            input_texts (List[str]): A list of texts to compare against the query.
            query (str): The query text for which similarity is measured against each input text.

        Returns:
            List[str]: A list of texts from input texts that are most similar to the query.

        Example:
            similarities = self.embeddings_similarity(["Hello world", "Good morning"], "Hello")
            print(similarities)
        """

        # Helper for text splitting
        def split_text_to_sentences(text):
            list_of_sentences = re.split(
                r"(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s", text
            )
            return list_of_sentences

        # Generate embedding for each text of the sentence list
        def embedding_for_text(list_of_sentences):
            embeddings = []
            for sentence in list_of_sentences:
                try:
                    query_response = self.query_endpoint(sentence.encode("utf-8"))
                except Exception as e:
                    if e.response["Error"]["Code"] == "ModelError":
                        raise Exception(
                            "Backend scripts have been updated in Feb '22 to standardize response "
                            "format of endpoint response."
                            "Previous endpoints may not support verbose response type used in this notebook."
                            f"To use this notebook, please launch the endpoint again. Error: {e}."
                        )
                    else:
                        raise
                try:
                    embedding, model_output = self.parse_response(query_response)
                except (TypeError, KeyError) as e:
                    raise Exception(
                        "Backend scripts have been updated in Feb '22 to standardize response "
                        "format of endpoint response."
                        "Response from previous endpoints not consistent with this notebook."
                        f"To use this notebook, please launch the endpoint again. Error: {e}."
                    )
                embeddings.append(embedding)
            embeddings = np.array(embeddings)
            average_embedding = np.mean(embeddings, axis=0)
            return average_embedding

        # Get embedding vector for the query
        embedding_query = embedding_for_text(split_text_to_sentences(query))
        embedding_query = embedding_query.reshape(1, -1)

        # Get embedding vectors for the input texts
        embedding_text_repo = []
        for text in input_texts:
            list_of_sentences = split_text_to_sentences(text)
            embedding_text = embedding_for_text(list_of_sentences)
            embedding_text_repo.append(embedding_text)

        embedding_text_repo = np.array(embedding_text_repo)
        # Print out the most similar article in the article repository based on their embeddings.
        inner_product = np.inner(embedding_text_repo, embedding_query)
        idx = np.argmax(inner_product)

        print(
            f"{self.bold}For the query article - Electric Vehicles & Green Energy{self.unbold}: {self.newline}"
            f"{query[:500]}...{self.newline}"
            f"{self.bold}The most similar article in the repository is: Article {idx} - {input_texts[idx]}{self.unbold}{self.newline}"
            f"{input_texts[idx][:500]}..."
        )

        # TODO: select the most similar texts to query
        res_texts = []
        res_texts.append(input_texts[idx])
        return res_texts
