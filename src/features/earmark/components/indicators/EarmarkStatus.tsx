import {formatDate} from "../../../../utils/formatDate.ts";
import type {Earmark} from "../../api/earmark.ts";
import Indicator from "./Indicator.tsx";
import {BookmarkIcon, HeadphonesIcon} from "../../../../components/Icon.tsx";

export default function EarmarkStatus({earmark}: {
    earmark: Earmark,
}) {
    const {createdAt, listened, listenedAt} = earmark;
    const icon = listened ? HeadphonesIcon : BookmarkIcon;

    if (listened && !listenedAt) {
        return <Indicator icon={icon} label="Listened"/>;
    }

    const label = listenedAt ? "Listened on" : "Earmarked on";
    const formatted = listenedAt
        ? formatDate(`${listenedAt}T00:00:00`)
        : formatDate(createdAt);

    return <Indicator icon={icon} label={`${label} ${formatted}`}/>
}