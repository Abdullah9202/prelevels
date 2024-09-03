

export default function Dashboard({ params }: { params: { id: string } }) {
    const { id } = params;

    return(
        <div>THis is ur id {id}</div>
    )
}