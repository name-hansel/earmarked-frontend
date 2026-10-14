import {isAxiosError} from "axios";

export function getSearchErrorMessage(error: unknown) {
    if (isAxiosError(error)) {
        switch (error.response?.data?.code) {
            case "RATE_LIMITED":
                return "Too many searches. Please wait a moment and try again.";
            case "SPOTIFY_UNAVAILABLE":
                return "Spotify is having trouble right now. Please try again later.";
        }

        if (!error.response) {
            return "Can't reach the server. Check your connection.";
        }
    }

    return "Something went wrong. Please try again."
}