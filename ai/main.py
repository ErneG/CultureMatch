from dotenv import load_dotenv

from ai.connectors.sagemaker_embedding import SageMakerEmbeddings
from ai.connectors.sagemaker_sentiment import SageMakerSentiment
from ai.scorers.conductivity import ConductivityScorer

load_dotenv()

# Sentiment Analysis tests
sentiment_analysis = SageMakerSentiment()

sentiment_res1 = sentiment_analysis.sentiment_analysis_single(
    "I really enjoy the team activities and the work environment."
)
print(sentiment_res1[0])
print(sentiment_res1[1])
print()

sentiment_res2 = sentiment_analysis.sentiment_analysis_single(
    "I feel like my work has a deep impact, but it's stressful."
)
print(sentiment_res2[0])
print(sentiment_res2[1])
print()

# Embeddings tests
input_texts = [
    "I really enjoy the team activities and the work environment.",
    "I feel like my work has a deep impact, but it's stressful.",
]
embeddings = SageMakerEmbeddings()
embeddings_res = embeddings.embeddings_batch(input_texts)
for i, embedding_res in enumerate(embeddings_res):
    print(f"Original text: {input_texts[i]}")
    print(f"Embed: {embedding_res}")

# Testing conductivity score
conductivity_scorer = ConductivityScorer()
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
scores = conductivity_scorer.calculate_conductivity_scores_batch(
    input_texts,
    clustering=False,
    use_advanced_metric=False,
)
print(scores)
