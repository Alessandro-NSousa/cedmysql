<template>
  <div>
    <h2 id="page-heading" data-cy="ProcessoHeading">
      <span v-text="$t('cedmysqlApp.processo.home.title')" id="processo-heading">Processos</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('cedmysqlApp.processo.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ProcessoCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-processo"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('cedmysqlApp.processo.home.createLabel')"> Create a new Processo </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && processos && processos.length === 0">
      <span v-text="$t('cedmysqlApp.processo.home.notFound')">No processos found</span>
    </div>
    <div class="table-responsive" v-if="processos && processos.length > 0">
      <table class="table table-striped" aria-describedby="processos">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('cedmysqlApp.processo.statusProcesso')">Status Processo</span></th>
            <th scope="row"><span v-text="$t('cedmysqlApp.processo.matricula')">Matricula</span></th>
            <th scope="row"><span v-text="$t('cedmysqlApp.processo.nome')">Nome</span></th>
            <th scope="row"><span v-text="$t('cedmysqlApp.processo.data')">Data</span></th>
            <th scope="row"><span v-text="$t('cedmysqlApp.processo.numeroDaDefesa')">Numero Da Defesa</span></th>
            <th scope="row"><span v-text="$t('cedmysqlApp.processo.statusSigaa')">Status Sigaa</span></th>
            <th scope="row"><span v-text="$t('cedmysqlApp.processo.numeroSipac')">Numero Sipac</span></th>
            <th scope="row"><span v-text="$t('cedmysqlApp.processo.enviadoBiblioteca')">Enviado Biblioteca</span></th>
            <th scope="row"><span v-text="$t('cedmysqlApp.processo.turma')">Turma</span></th>
            <th scope="row"><span v-text="$t('cedmysqlApp.processo.entregaDiploma')">Entrega Diploma</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="processo in processos" :key="processo.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ProcessoView', params: { processoId: processo.id } }">{{ processo.id }}</router-link>
            </td>
            <td v-text="$t('cedmysqlApp.StatusProcesso.' + processo.statusProcesso)">{{ processo.statusProcesso }}</td>
            <td>{{ processo.matricula }}</td>
            <td>{{ processo.nome }}</td>
            <td>{{ processo.data }}</td>
            <td>{{ processo.numeroDaDefesa }}</td>
            <td v-text="$t('cedmysqlApp.Status.' + processo.statusSigaa)">{{ processo.statusSigaa }}</td>
            <td>{{ processo.numeroSipac }}</td>
            <td v-text="$t('cedmysqlApp.Enviado.' + processo.enviadoBiblioteca)">{{ processo.enviadoBiblioteca }}</td>
            <td>
              <div v-if="processo.turma">
                <router-link :to="{ name: 'TurmaView', params: { turmaId: processo.turma.id } }">{{ processo.turma.ano }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="processo.entregaDiploma">
                <router-link :to="{ name: 'EntregaDiplomaView', params: { entregaDiplomaId: processo.entregaDiploma.id } }">{{
                  processo.entregaDiploma.dataDeEntrega
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ProcessoView', params: { processoId: processo.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ProcessoEdit', params: { processoId: processo.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(processo)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="cedmysqlApp.processo.delete.question" data-cy="processoDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-processo-heading" v-text="$t('cedmysqlApp.processo.delete.question', { id: removeId })">
          Are you sure you want to delete this Processo?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-processo"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeProcesso()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./processo.component.ts"></script>
