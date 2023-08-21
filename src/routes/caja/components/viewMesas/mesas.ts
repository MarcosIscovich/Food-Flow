export interface Mesa {
    id: number;
    nombre: string;
    estado: string;
    orden_id?: number;
    //color: string;
}



const mesas: Mesa[] = [];

for (let i = 1; i <= 100; i++) {
    if (i % 5 === 0) {
        const mesa: Mesa = {
            id: i,
            nombre: `Mesa ${i}`,
            estado: "ocupada",
            //color: "bg-red-500"
        };
        mesas.push(mesa);
        continue;
    }
    if (i % 7 === 0) {
        const mesa: Mesa = {
            id: i,
            nombre: `Mesa ${i}`,
            estado: "reservada",
            //color: "bg-red-500"
        };
        mesas.push(mesa);
        continue;
    }
    if (i % 39 === 0) {
        const mesa: Mesa = {
            id: i,
            nombre: `Mesa ${i}`,
            estado: "cerrada",
            //color: "bg-red-500"
        };
        mesas.push(mesa);
        continue;
    }
    const mesa: Mesa = {
        id: i,
        nombre: `Mesa ${i}`,
        estado: "libre",
        //color: "bg-green-500"
    };
    mesas.push(mesa);
}



export default mesas;
