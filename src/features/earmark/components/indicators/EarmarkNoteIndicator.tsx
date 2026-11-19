import type {Earmark} from "../../api/earmark.ts";
import {NoteIcon} from "../../../../components/Icon.tsx";
import Indicator from "./Indicator.tsx";

export default function EarmarkNoteIndicator({earmark}: { earmark: Earmark }) {
    if (!earmark.note) {
        return null;
    }

    return <Indicator icon={NoteIcon} label="Has a note"/>;
}