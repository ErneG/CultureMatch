# TODO:
# 1. Load template feedbacks into memory
# 2. Perform all nltk downloads
# 2. Perform all spacy downloads

import os
import nltk
import spacy


def download_nltk_resources():
    """
    Downloads the required nltk resources to ensure they are available for the application.
    """

    print("NLTK download places")
    print(nltk.data.path)

    nltk.download("punkt")
    nltk.download('punkt_tab')
    nltk.download("averaged_perceptron_tagger")
    nltk.download("stopwords")


def download_spacy_model():
    """
    Checks if required spacy models are installed and downloads them if not.
    Returns the loaded spaCy nlp instance.
    """
    model_name = "en_core_web_sm"

    try:
        # Attempt to load the model to check if it exists
        nlp = spacy.load(model_name)
        print(f"'{model_name}' model is already downloaded.")
    except OSError:
        # If the model is not found, download it
        print(f"Downloading '{model_name}' model...")
        from spacy.cli import download

        download(model_name)
        nlp = spacy.load(model_name)
        print(f"'{model_name}' model downloaded successfully.")

    return nlp


# Singleton of spacy nlp instance
nlp = download_spacy_model()


def run_setup():
    download_nltk_resources()
