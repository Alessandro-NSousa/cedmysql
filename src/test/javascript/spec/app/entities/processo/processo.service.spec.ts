/* tslint:disable max-line-length */
import axios from 'axios';
import sinon from 'sinon';
import dayjs from 'dayjs';

import { DATE_FORMAT } from '@/shared/date/filters';
import ProcessoService from '@/entities/processo/processo.service';
import { Processo } from '@/shared/model/processo.model';
import { StatusProcesso } from '@/shared/model/enumerations/status-processo.model';
import { Status } from '@/shared/model/enumerations/status.model';
import { Enviado } from '@/shared/model/enumerations/enviado.model';

const error = {
  response: {
    status: null,
    data: {
      type: null,
    },
  },
};

const axiosStub = {
  get: sinon.stub(axios, 'get'),
  post: sinon.stub(axios, 'post'),
  put: sinon.stub(axios, 'put'),
  patch: sinon.stub(axios, 'patch'),
  delete: sinon.stub(axios, 'delete'),
};

describe('Service Tests', () => {
  describe('Processo Service', () => {
    let service: ProcessoService;
    let elemDefault;
    let currentDate: Date;

    beforeEach(() => {
      service = new ProcessoService();
      currentDate = new Date();
      elemDefault = new Processo(
        123,
        StatusProcesso.PENDENTE,
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        Status.ATIVO,
        'AAAAAAA',
        Enviado.SIM
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            data: dayjs(currentDate).format(DATE_FORMAT),
          },
          elemDefault
        );
        axiosStub.get.resolves({ data: returnedFromService });

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should not find an element', async () => {
        axiosStub.get.rejects(error);
        return service
          .find(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should create a Processo', async () => {
        const returnedFromService = Object.assign(
          {
            id: 123,
            data: dayjs(currentDate).format(DATE_FORMAT),
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            data: currentDate,
          },
          returnedFromService
        );

        axiosStub.post.resolves({ data: returnedFromService });
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not create a Processo', async () => {
        axiosStub.post.rejects(error);

        return service
          .create({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should update a Processo', async () => {
        const returnedFromService = Object.assign(
          {
            statusProcesso: 'BBBBBB',
            matricula: 'BBBBBB',
            nome: 'BBBBBB',
            data: dayjs(currentDate).format(DATE_FORMAT),
            numeroDaDefesa: 'BBBBBB',
            statusSigaa: 'BBBBBB',
            numeroSipac: 'BBBBBB',
            enviadoBiblioteca: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            data: currentDate,
          },
          returnedFromService
        );
        axiosStub.put.resolves({ data: returnedFromService });

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not update a Processo', async () => {
        axiosStub.put.rejects(error);

        return service
          .update({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should partial update a Processo', async () => {
        const patchObject = Object.assign(
          {
            statusProcesso: 'BBBBBB',
            nome: 'BBBBBB',
            data: dayjs(currentDate).format(DATE_FORMAT),
            numeroDaDefesa: 'BBBBBB',
            enviadoBiblioteca: 'BBBBBB',
          },
          new Processo()
        );
        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            data: currentDate,
          },
          returnedFromService
        );
        axiosStub.patch.resolves({ data: returnedFromService });

        return service.partialUpdate(patchObject).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should not partial update a Processo', async () => {
        axiosStub.patch.rejects(error);

        return service
          .partialUpdate({})
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should return a list of Processo', async () => {
        const returnedFromService = Object.assign(
          {
            statusProcesso: 'BBBBBB',
            matricula: 'BBBBBB',
            nome: 'BBBBBB',
            data: dayjs(currentDate).format(DATE_FORMAT),
            numeroDaDefesa: 'BBBBBB',
            statusSigaa: 'BBBBBB',
            numeroSipac: 'BBBBBB',
            enviadoBiblioteca: 'BBBBBB',
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            data: currentDate,
          },
          returnedFromService
        );
        axiosStub.get.resolves([returnedFromService]);
        return service.retrieve().then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should not return a list of Processo', async () => {
        axiosStub.get.rejects(error);

        return service
          .retrieve()
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });

      it('should delete a Processo', async () => {
        axiosStub.delete.resolves({ ok: true });
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });

      it('should not delete a Processo', async () => {
        axiosStub.delete.rejects(error);

        return service
          .delete(123)
          .then()
          .catch(err => {
            expect(err).toMatchObject(error);
          });
      });
    });
  });
});
