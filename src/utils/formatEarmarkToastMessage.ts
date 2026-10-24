export function getEarmarkAddedMessage(albumName: string | undefined) {
    return albumName ? `'${albumName}' earmarked!` : 'Earmark added';
}

export function getEarmarkRemovedMessage(albumName: string | undefined) {
    return albumName ? `'${albumName}' earmark removed` : "Earmark removed";
}

export function getEarmarkUpdatedMessage(albumName: string | undefined) {
    return albumName ? `'${albumName}' earmark updated` : "Earmark updated";
}

export function getEarmarkUpdatedAsListened(albumName: string | undefined) {
    return albumName ? `'${albumName}' marked as listened!` : 'Album marked as listened!';
}

export function getEarmarkUpdatedAsToListen(albumName: string | undefined) {
    return albumName ? `'${albumName}' marked as to listen` : 'Album marked as to listen';
}