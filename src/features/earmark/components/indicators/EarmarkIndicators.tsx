import type {Earmark} from "../../api/earmark.ts";
import EarmarkStatus from "./EarmarkStatus.tsx";
import EarmarkNoteIndicator from "./EarmarkNoteIndicator.tsx";

export default function EarmarkIndicators({earmark}: { earmark: Earmark | undefined }) {
    return earmark && <>
        <EarmarkStatus earmark={earmark}/>
        <EarmarkNoteIndicator earmark={earmark}/>
    </>
}