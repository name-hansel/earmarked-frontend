import {formatDate} from "../../../../utils/formatDate.ts";
import type {Earmark} from "../../api/earmark.ts";
import Indicator from "./Indicator.tsx";
import {BookmarkIcon, HeadphonesIcon} from "../../../../components/Icon.tsx";

export default function EarmarkStatus({earmark, showIcon = false, showDate = true}: {
    earmark: Earmark,
    showIcon?: boolean,
    showDate?: boolean
}) {
    const {createdAt, listened, listenedAt} = earmark;
    const icon = listened ? HeadphonesIcon : BookmarkIcon;

    if (listened && !listenedAt) {
        return <Indicator icon={icon} label="Listened" showIcon={showIcon}/>;
    }

    const date = listenedAt ?? createdAt;
    const label = listenedAt ? "Listened on" : "Earmarked on";
    const formatted = listenedAt
        ? formatDate(`${listenedAt}T00:00:00`)
        : formatDate(createdAt);

    return <Indicator icon={icon} label={label} title={`${label} ${formatted}`}
                      showIcon={showIcon} hideChildren={showIcon && !showDate}>
        <time dateTime={date}>{formatted}</time>
    </Indicator>;
}