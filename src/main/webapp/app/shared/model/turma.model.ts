export interface ITurma {
  id?: number;
  curso?: string | null;
  sigla?: string | null;
  ano?: string | null;
}

export class Turma implements ITurma {
  constructor(public id?: number, public curso?: string | null, public sigla?: string | null, public ano?: string | null) {}
}
