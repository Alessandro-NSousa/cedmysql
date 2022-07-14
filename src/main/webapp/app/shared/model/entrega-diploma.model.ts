export interface IEntregaDiploma {
  id?: number;
  dataDeEntrega?: Date | null;
  observacoes?: string | null;
}

export class EntregaDiploma implements IEntregaDiploma {
  constructor(public id?: number, public dataDeEntrega?: Date | null, public observacoes?: string | null) {}
}
