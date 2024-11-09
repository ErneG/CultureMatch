import os
import json
import boto3
from typing import Tuple


class SageMakerSentiment:
    def __init__(self) -> None:
        self.newline = "\n"
        self.bold = "\033[1m"
        self.unbold = "\033[0m"
        self.sentiment_endpoint = os.environ["SGM_SENTIMENT_ENDPOINT"]

    def sentiment_analysis_single(self, input_text: str) -> Tuple[str, float]:
        """
        Analyze the sentiment of a single input text and return the result as a string.

        Args:
            input_text (str): The text to be analyzed for sentiment.

        Returns:
            (str, number): A tuple of string representing the sentiment of the input text ("POSITIVE", "NEGATIVE") and a numeric score from 0 to 1.

        Example:
            result = self.sentiment_analysis_single("I love this product!")
            print(result)
        """

        # Query SageMaker endpoint running distilbert-base-cased
        def query_endpoint(encoded_text):
            client = boto3.client("runtime.sagemaker")
            response = client.invoke_endpoint(
                EndpointName=self.sentiment_endpoint,
                ContentType="application/x-text",
                Body=encoded_text,
                Accept="application/json;verbose",
            )
            return response

        # Parse response from distilbert-base-cased
        def parse_response(query_response):
            model_predictions = json.loads(query_response["Body"].read())
            probabilities, labels, predicted_label = (
                model_predictions["probabilities"],
                model_predictions["labels"],
                model_predictions["predicted_label"],
            )
            return probabilities, labels, predicted_label

        try:
            query_response = query_endpoint(input_text.encode("utf-8"))
            probabilities, labels, predicted_label = parse_response(query_response)
        except Exception as e:
            print(e)

        # print(
        #     f"Inference:{self.newline}"
        #     f"Input text: '{input_text}'{self.newline}"
        #     f"Model prediction: {probabilities}{self.newline}"
        #     f"Labels: {labels}{self.newline}"
        #     f"Predicted Label: {self.bold}{predicted_label}{self.unbold}{self.newline}"
        # )

        # Format the returned label and score
        if predicted_label == "LABEL_0":
            res_label = "NEGATIVE"
            res_prob = probabilities[0]
        else:
            res_prob = probabilities[1]
            res_label = "POSITIVE"

        return (res_label, res_prob)
