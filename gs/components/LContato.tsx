
import { Contato } from '../data/listaContato';

type listaContatoProps = {
    itens: Contato[];
}

function listaContato(props: listaContatoProps) {
    return (
        <>
            <h2>Lista de compras</h2>
            {props.itens.map(function (Contato) {
                return (
                    <div key={Contato.id}>
                        <p>Nome: {Contato.nome}</p>
                        <p>Rm: {Contato.rm}</p>
                        <hr />
                    </div>
                )
            })}
        </>
    )
}
export default listaContato;