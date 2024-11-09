from dotenv import load_dotenv

from ai.scorers.complexity import ComplexityScorer
from ai.scorers.conductivity import ConductivityScorer
from ai.scorers.sentiment import SentimentScorer
from ai.setup import run_setup

load_dotenv()

# Set up general AI module
run_setup()

# Set up test feedbacks
input_texts = [
    "I really enjoy the team activities and the work environment.",
    "I feel like my work has a deep impact, but it's stressful.",
    "I'm content with the management, but I don't find my tasks very engaging.",
    "I really appreciate the new flexible work policies.",
    "The management needs to be more transparent about decisions.",
    "This is the worst work environment I've experienced.",
    "Great, thanks.",
    "As an employee of this esteemed organization, I am consistently inspired by our collective commitment to excellence and innovation. It's truly gratifying to witness how our team's diverse expertise and unwavering dedication to delivering exceptional results shape the trajectory of both the company and the industry at large. The collaborative culture we foster encourages the exchange of bold ideas, while maintaining a keen focus on continuous improvement and operational efficiency. I am proud to be part of a forward-thinking organization that not only values personal growth but also invests in creating meaningful and lasting impact in the communities we serve.",
]

# Sentiment Analysis tests
sentiment_scorer = SentimentScorer()
sentiment_scores = sentiment_scorer.calculate_sentiment_scores_batch(input_texts)
print("SENTIMENT SCORES")
print(sentiment_scores)
print()

# Conductivity score tests
conductivity_scorer = ConductivityScorer()
conductivity_scores = conductivity_scorer.calculate_conductivity_scores_batch(
    input_texts
)
print("MEANINGFULNESS SCORES")
print(conductivity_scores)
print()

# Complexity score tests
complexity_scorer = ComplexityScorer()
complexity_scores = complexity_scorer.complexity_score_batch(input_texts)
print("COMPLEXITY SCORES")
print(complexity_scores)
print()
