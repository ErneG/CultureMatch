from typing import List, Tuple

from ai.connectors.sagemaker_sentiment import SageMakerSentiment


class SentimentScorer:
    def __init__(self):
        self.sgm_sentiment_instance = SageMakerSentiment()

        print("Sentiment scorer initialized")

    def calculate_sentiment_scores_batch(
        self,
        input_texts: List[str],
    ) -> List[Tuple[str, float]]:
        """
        Calculate sentiment scores for a batch of input texts.

        Args:
            input_texts (List[str]): A list of input texts for which sentiment scores need to be calculated.

        Returns:
            List[(str, float)]: A list of tuples, where each tuple contains:
                - A string representing the sentiment label ("POSITIVE", "NEGATIVE").
                - A float representing the confidence score of the sentiment.

        Example:
            scores = self.calculate_sentiment_scores_batch(["I love this!", "This is terrible."])
            print(scores)
        """

        # Analyse each input text for sentiment separately
        sentiment_results = []

        for text in input_texts:
            sentiment_res = self.sgm_sentiment_instance.sentiment_analysis_single(text)
            print(f"SENT: Processing comment: {text} - value: {sentiment_res}")
            sentiment_results.append(sentiment_res)

        return sentiment_results
