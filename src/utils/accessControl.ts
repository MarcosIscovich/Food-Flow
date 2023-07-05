const rolesComanda = [
    'Administrador',
    'Camarero',
    'Encargado',
]

export enum Acciones {
    ACCESO_COMANDA = "ACCESO-COMANDA",
    ACCESO_FULL = "ACCESO-FULL",
}

const access = [
    {
        rol: rolesComanda,
        action: Acciones.ACCESO_COMANDA,        
    },
    {
        rol: 'Administrador', 
        action: Acciones.ACCESO_FULL,        
    }
]


export default function accessControl(rol: string, action: string): boolean {

    const rolAccess = access.find(rolAccess => rolAccess.action === action)
    if(!rolAccess) return false

    if(rolAccess.rol.includes(rol)) return true

    return false
}

