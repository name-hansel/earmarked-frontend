export function getEarmarkAddedMessage(albumName: string | undefined) {
    return albumName ? `'${albumName}' earmarked!` : 'Earmark added';
}

export function getEarmarkRemovedMessage(albumName: string | undefined) {
    return albumName ? `'${albumName}' earmark removed` : "Earmark removed";
}

export function getEarmarkUpdatedMessage(albumName: string | undefined) {
    return albumName ? `'${albumName}' earmark updated` : "Earmark updated";
}