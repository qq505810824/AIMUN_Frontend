export type Sentence = {
    ipa_transcript?: string;
    real_transcript?: string[];
    transcript_translation?: string;
};

export type SentenceRecord = {
    real_transcript?: string;
    ipa_transcript?: string;
    pronunciation_accuracy?: string;
    real_transcripts?: string;
    matched_transcripts?: string;
    real_transcripts_ipa?: string;
    matched_transcripts_ipa?: string;
    pair_accuracy_category?: string;
    start_time?: string;
    end_time?: string;
    is_letter_correct_all_words?: string;
};

export enum Language {
    en = 'en'
}
