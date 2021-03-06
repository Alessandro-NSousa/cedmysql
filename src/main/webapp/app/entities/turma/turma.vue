<template>
  <div>
    <h2 id="page-heading" data-cy="TurmaHeading">
      <span v-text="$t('cedmysqlApp.turma.home.title')" id="turma-heading">Turmas</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('cedmysqlApp.turma.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'TurmaCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-turma"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('cedmysqlApp.turma.home.createLabel')"> Create a new Turma </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && turmas && turmas.length === 0">
      <span v-text="$t('cedmysqlApp.turma.home.notFound')">No turmas found</span>
    </div>
    <div class="table-responsive" v-if="turmas && turmas.length > 0">
      <table class="table table-striped" aria-describedby="turmas">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('cedmysqlApp.turma.curso')">Curso</span></th>
            <th scope="row"><span v-text="$t('cedmysqlApp.turma.sigla')">Sigla</span></th>
            <th scope="row"><span v-text="$t('cedmysqlApp.turma.ano')">Ano</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="turma in turmas" :key="turma.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'TurmaView', params: { turmaId: turma.id } }">{{ turma.id }}</router-link>
            </td>
            <td>{{ turma.curso }}</td>
            <td>{{ turma.sigla }}</td>
            <td>{{ turma.ano }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'TurmaView', params: { turmaId: turma.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'TurmaEdit', params: { turmaId: turma.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(turma)"
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
        ><span id="cedmysqlApp.turma.delete.question" data-cy="turmaDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-turma-heading" v-text="$t('cedmysqlApp.turma.delete.question', { id: removeId })">
          Are you sure you want to delete this Turma?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-turma"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeTurma()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./turma.component.ts"></script>
