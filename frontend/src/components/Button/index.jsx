export default function Button({ texto, aoClicar }) {

    return (
        <button onClick={aoClicar}>
            {texto}
        </button>
    );
}