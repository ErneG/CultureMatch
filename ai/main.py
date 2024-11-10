from typing import List
from dotenv import load_dotenv

from ai.scorers.category import CategoryScorer
from ai.scorers.complexity import ComplexityScorer
from ai.scorers.conductivity import ConductivityScorer
from ai.scorers.sentiment import SentimentScorer
from ai.setup import run_setup

load_dotenv()

# Set up general AI module
run_setup()

# Set up test feedbacks and their categories
input_texts = [
    "I really enjoy the team activities and the work environment.",
    "I feel like my work has a deep impact, but it's stressful.",
    "I'm content with the management, but I don't find my tasks very engaging.",
    "I really appreciate the new flexible work policies.",
    "The management needs to be more transparent about decisions.",
    "Great, thanks.",
    "As an employee of this esteemed organization, I am consistently inspired by our collective commitment to excellence and innovation. It's truly gratifying to witness how our team's diverse expertise and unwavering dedication to delivering exceptional results shape the trajectory of both the company and the industry at large. The collaborative culture we foster encourages the exchange of bold ideas, while maintaining a keen focus on continuous improvement and operational efficiency. I am proud to be part of a forward-thinking organization that not only values personal growth but also invests in creating meaningful and lasting impact in the communities we serve.",
]
input_labels = [
    "happiness",
    "pressure",
    "satisfaction",
    "flexibility",
    "management",
    "support",
    "belonging",
]
assert len(input_labels) == len(input_texts)

# Set up analysis categories
candidate_labels = [
    "happiness",
    "belonging",
    "purpose",
    "inclusion",
    "learning",
    "support",
    "flexibility",
    "satisfaction",
    "achievement",
    "appreciation",
    "management",
    "pressure",
    "energy",
    "trust",
    "compensation",
]


class WeightedScorer:
    """
    A class that provides methods to calculate weighted scores for text inputs.

    Methods
    -------
    calculate_weighted_single_text(input_text: str, alpha=0.05, beta=0.35, gamma=0.3, delta=0.3) -> float:
        Computes the weighted score for a single text input using the specified weight parameters.

    calculate_weighted_batch(input_texts: List[str], alpha=0.05, beta=0.35, gamma=0.3, delta=0.3) -> List[float]:
        Computes weighted scores for a batch of text inputs using the specified weight parameters.

    Parameters
    ----------
    input_text : str
        The text input for which the weighted score is to be calculated.

    input_texts : List[str]
        A list of text inputs for which the weighted scores are to be calculated.

    alpha : float, optional
        Weight parameter for the first scoring component (default is 0.05).

    beta : float, optional
        Weight parameter for the second scoring component (default is 0.35).

    gamma : float, optional
        Weight parameter for the third scoring component (default is 0.3).

    delta : float, optional
        Weight parameter for the fourth scoring component (default is 0.3).

    Returns
    -------
    float
        The weighted score for a single text input.

    List[float]
        A list of weighted scores for the batch of text inputs.
    """

    def __init__(self):
        self.sentiment_scorer = SentimentScorer()
        self.conductivity_scorer = ConductivityScorer()
        self.complexity_scorer = ComplexityScorer()
        self.category_scorer = CategoryScorer()

        print("Weighted scorer initialized")

    def calculate_weighted_single_text(
        self,
        input_text: str,
        input_keyword: str,
        alpha=0.05,
        beta=0.35,
        gamma=0.3,
        delta=0.3,
    ) -> float:
        """
        Calculates a weighted score using sentiment, conductivity, and complexity score for a single text.

        Parameters:
        - alpha, beta, gamma: Weights for sentiment, conductivity, and complexity, respectively.

        Returns:
        - Combined weighted scores (float).
        """

        score = self.calculate_weighted_batch(
            input_texts=[input_text],
            input_keywords=[input_keyword],
            alpha=alpha,
            beta=beta,
            gamma=gamma,
            delta=delta,
        )
        return score[0]

    def calculate_weighted_batch(
        self,
        input_texts: List[str],
        input_keywords: List[str],
        alpha=0.05,
        beta=0.35,
        gamma=0.3,
        delta=0.3,
    ) -> List[float]:
        """
        Calculates a weighted score using sentiment, conductivity, and complexity scores for a batch of texts.

        Parameters:
        - alpha, beta, gamma: Weights for sentiment, conductivity, and complexity, respectively.

        Returns:
        - List of combined weighted scores (floats).
        """

        # Generate individual scores for input_texts
        sentiment_scores = self.sentiment_scorer.calculate_sentiment_scores_batch(
            input_texts
        )
        conductivity_scores = (
            self.conductivity_scorer.calculate_conductivity_scores_batch(input_texts)
        )
        complexity_scores = self.complexity_scorer.complexity_score_batch(input_texts)
        category_scores = (
            self.category_scorer.calculate_category_correspondance_scores_batch(
                total_categories=candidate_labels,
                input_texts=input_texts,
                input_categories=input_keywords,
            )
        )

        # Combining the scores
        combined_scores = []
        for i, result in enumerate(sentiment_scores):
            sentiment_label = result[0]
            sentiment_score = result[1]

            # Adjust sentiment score based on label
            if sentiment_label == "POSITIVE":
                sentiment_weighted = sentiment_score  # Positive score as is
            elif sentiment_label == "NEGATIVE":
                sentiment_weighted = 1 - sentiment_score  # Negative score inverted
            else:
                sentiment_weighted = sentiment_score * 0.5  # Neutral (less impactful)

            # Ensure the sentiment score is scaled between 0 and 1
            sentiment_weighted = max(0, min(1, sentiment_weighted))

            # Calculate final weighted score using the provided formula
            final_score = (
                alpha * sentiment_weighted
                + beta * conductivity_scores[i]
                + gamma * complexity_scores[i]
                + delta * category_scores[i]
            )

            # Normalize the final score to ensure it stays between 0 and 1
            final_score = max(0, min(1, final_score))
            combined_scores.append(final_score)

        # for i, score in enumerate(combined_scores):
        #     print(f"Feedback {i+1}: {input_texts[i]}")
        #     print(
        #         f"Sensitivity Score (normalized) = {sentiment_scores[i][0]}: {sentiment_scores[i][1]:.4f}"
        #     )
        #     print(f"Conductivity Score (normalized) = {conductivity_scores[i]:.2f}")
        #     print(f"Complexity Score (normalized) = {complexity_scores[i]:.2f}")
        #     print(
        #         f"Category Score (normalized) = {input_labels[i]}: {category_scores[i]:.2f}"
        #     )
        #     print(f"-----------------= RESULT =-----------------")
        #     print(f"Weighted Score (normalized) = {score:.2f}\n")

        return combined_scores


# ! TEST ONLY

# weighted = WeightedScorer()
# scores = weighted.calculate_weighted_batch(
#     input_texts,
#     input_labels,
#     alpha=0.05,
#     beta=0.45,
#     gamma=0.3,
#     delta=0.2,
# )
# print("WEIGHTED SCORES")
# print(scores)
# print()
