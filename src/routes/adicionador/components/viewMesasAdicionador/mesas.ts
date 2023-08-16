interface Mesa {
    id: number;
    nombre: string;
    estado: string;
    color: string;
}



const mesas: Mesa[] = [];

for (let i = 1; i <= 100; i++) {
    const mesa: Mesa = {
        id: i,
        nombre: `Mesa ${i}`,
        estado: "Libre",
        color: "bg-green-500"
    };
    mesas.push(mesa);
}



export default mesas;
