from typing import List, Tuple

from ai.connectors.sagemaker_zeroshot import SageMakerZeroShot


class CategoryScorer:
    def __init__(self):
        self.sgm_zeroshot_instance = SageMakerZeroShot()

        print("Category scorer initialized")

    def get_score_by_label(self, label_scores_dict, key: str) -> float:
        """
        Retrieve the score for a given label key from the dictionary.

        Args:
            label_scores_dict (dict): The dictionary containing label-score pairs.
            key (str): The key for which the score is requested.

        Returns:
            float: The score corresponding to the key if found, or None if not found.

        Raises:
            KeyError: If the key is not found in the dictionary.
        """

        try:
            score = label_scores_dict[key]
            return score
        except KeyError:
            print(f"Error: The label '{key}' does not exist in the dictionary.")
            return None

    def calculate_category_correspondance_scores_batch(
        self,
        total_categories: List[str],
        input_texts: List[str],
        input_categories: List[str],
    ) -> List[float]:
        """
        Calculate correspondence scores for a batch of input texts based on given categories.

        This function evaluates how well the input texts correspond to a set of input categories
        relative to the total categories provided. It returns a list of scores representing the
        correspondence for each text in the input batch.

        Args:
            total_categories (List[str]): A list of all possible categories against which the input texts
                will be evaluated.
            input_texts (List[str]): A list of input texts for which correspondence scores need to be
                calculated.
            input_categories (List[str]): A list of categories associated with the input texts.

        Returns:
            List[float]: A list of float values, where each value represents the calculated correspondence
            score for the corresponding input text in the batch.

        Example:
            scores = self.calculate_category_correspondance_scores_batch(
                total_categories=["tech", "health", "finance"],
                input_texts=["AI advancements in tech", "Healthcare innovations"],
                input_categories=["tech", "health"]
            )
            print(scores)
        """

        # Analyse each input text for category correspondance separately
        category_results = []

        for text, category in zip(input_texts, input_categories):
            category_res = self.sgm_zeroshot_instance.zero_shot_single(
                input_text=text,
                candidate_labels=total_categories,
                multi_class=True,
            )

            # Get the rating of the text by specific category
            category_score = self.get_score_by_label(
                label_scores_dict=category_res,
                key=category,
            )
            if category_score == None:
                category_score = 0

            print(f"CATG: Processing comment: {text} - value: {category_score}")
            category_results.append(category_score)

        return category_results
