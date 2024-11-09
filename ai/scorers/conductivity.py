import json
from typing import List
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from ai.connectors.sagemaker_embedding import SageMakerEmbeddings


class ConductivityScorer:
    def __init__(
        self,
        template_embeddings_filename: str = "ai/sample_data/template_feedbacks_embed.json",
        template_feedbacks_filename: str = "ai/sample_data/template_feedbacks.json",
    ):
        self.sgm_embedding_instance = SageMakerEmbeddings()
        self.template_embeddings_filename = template_embeddings_filename
        self.template_feedbacks_filename = template_feedbacks_filename

        template_embeddings_stored = self.retrieve_template_embeddings()
        if template_embeddings_stored != None:
            self.template_embeddings = template_embeddings_stored
        else:
            self.template_embeddings = self.write_template_embeddings()

        print("Conductivity scorer initialized")

    def write_template_embeddings(self):
        """
        Reads the content of template feedbacks JSON file and generates the embeddings for each feedback.
        """

        # Read raw feedback from file
        try:
            with open(self.template_feedbacks_filename, "r", encoding="utf-8") as file:
                data = json.load(file)

            template_embeddings = self.sgm_embedding_instance.embeddings_batch(
                input_texts=data["content"]
            )

            print("Template feedback embeddings generated")
        except FileNotFoundError:
            print(
                f"Error: The file at {self.template_feedbacks_filename} was not found."
            )
            return None
        except json.JSONDecodeError:
            print(
                f"Error: The file at {self.template_feedbacks_filename} contains invalid JSON."
            )
            return None

        # Convert the numpy array (if any) to a list for JSON serialization
        if isinstance(template_embeddings, np.ndarray):
            template_embeddings = template_embeddings.tolist()

        # Write generated embeddings to another file
        if len(template_embeddings) > 0:
            try:
                embed_object = {
                    "name": "TEMPLATE_EMBED",
                    "content": template_embeddings,
                }
                with open(
                    self.template_embeddings_filename, "w", encoding="utf-8"
                ) as file:
                    json.dump(embed_object, file, indent=2)
                print(
                    f"Data successfully written to {self.template_embeddings_filename}"
                )
            except IOError as e:
                print(
                    f"Error: Unable to write to {self.template_embeddings_filename}. {e}"
                )
            return template_embeddings

    def retrieve_template_embeddings(self):
        """
        Reads the content of template embeddings JSON file.
        """

        # Read embedded feedback from file
        try:
            with open(self.template_embeddings_filename, "r", encoding="utf-8") as file:
                data = json.load(file)

            return data["content"]
        except FileNotFoundError:
            print(
                f"Error: The file at {self.template_embeddings_filename} was not found."
            )
            return None
        except json.JSONDecodeError:
            print(
                f"Error: The file at {self.template_embeddings_filename} contains invalid JSON."
            )
            return None

    def calculate_conductivity_scores_batch(
        self,
        input_texts: List[str],
    ) -> List[float]:
        """
        Calculate conductivity scores for a batch of input texts.

        Args:
            input_texts (List[str]): A list of input texts for which conductivity scores need to be calculated.

        Returns:
            List[float]: A list of conductivity scores, where each score corresponds to an input text.

        Example:
            scores = self.calculate_conductivity_scores_batch(["Text 1", "Text 2", "Text 3"])
            print(scores)
        """

        # Generate embeddings for the input texts
        feedback_embeddings = self.sgm_embedding_instance.embeddings_batch(input_texts)

        if self.template_embeddings == None:
            raise Exception(
                "Feedback template embeddings must be available to calculate meaningfulness score."
            )

        # Calculate similarity to the feedback templates and get the average score
        scores = []

        for i, feedback in enumerate(input_texts):
            # Calculate cosine similarity to all templates (flattened array of scores)
            similarities = cosine_similarity(
                [feedback_embeddings[i]], self.template_embeddings
            ).flatten()

            # Compute the average similarity across all templates
            meaningfulness = similarities.mean()

            # Calculate the length of the original feedback text (number of words)
            feedback_length = len(
                feedback.split()
            )  # Use number of words as length metric

            # Apply logarithmic scaling to the feedback length
            length_factor = np.log(feedback_length + 1)  # Adding 1 to avoid log(0)

            # Combine the meaningfulness with the length factor (balance length and score)
            # Length scaling: higher length means better score adjustment
            adjusted_meaningfulness = meaningfulness * length_factor

            scores.append(adjusted_meaningfulness)

        # Apply final normalization to range [0, 1]
        scores = (scores - np.min(scores)) / (np.max(scores) - np.min(scores) + 1e-5)

        # for score, feedback in zip(scores, input_texts):
        #     print(f"Feedback: {feedback}")
        #     print(f"Meaninfulness Score: {score:.2f}\n")

        return scores
