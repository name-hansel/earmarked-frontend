const MAX_NOTE_LENGTH = 256;


export default function EarmarkNoteField({value, onChange}: {
    value: string;
    onChange: (value: string) => void;
}) {
    return <div>
        <label htmlFor="earmark-note">Note</label>
        <textarea id="earmark-note" value={value} onChange={(event) => onChange(event.target.value)}
                  maxLength={MAX_NOTE_LENGTH} rows={5}/>
        <p>{value.length}/{MAX_NOTE_LENGTH}</p>
    </div>
}