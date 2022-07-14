<template>
  <div>
    <h2 id="page-heading" data-cy="EntregaDiplomaHeading">
      <span v-text="$t('cedmysqlApp.entregaDiploma.home.title')" id="entrega-diploma-heading">Entrega Diplomas</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('cedmysqlApp.entregaDiploma.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'EntregaDiplomaCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-entrega-diploma"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('cedmysqlApp.entregaDiploma.home.createLabel')"> Create a new Entrega Diploma </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && entregaDiplomas && entregaDiplomas.length === 0">
      <span v-text="$t('cedmysqlApp.entregaDiploma.home.notFound')">No entregaDiplomas found</span>
    </div>
    <div class="table-responsive" v-if="entregaDiplomas && entregaDiplomas.length > 0">
      <table class="table table-striped" aria-describedby="entregaDiplomas">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('cedmysqlApp.entregaDiploma.dataDeEntrega')">Data De Entrega</span></th>
            <th scope="row"><span v-text="$t('cedmysqlApp.entregaDiploma.observacoes')">Observacoes</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entregaDiploma in entregaDiplomas" :key="entregaDiploma.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'EntregaDiplomaView', params: { entregaDiplomaId: entregaDiploma.id } }">{{
                entregaDiploma.id
              }}</router-link>
            </td>
            <td>{{ entregaDiploma.dataDeEntrega }}</td>
            <td>{{ entregaDiploma.observacoes }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'EntregaDiplomaView', params: { entregaDiplomaId: entregaDiploma.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'EntregaDiplomaEdit', params: { entregaDiplomaId: entregaDiploma.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(entregaDiploma)"
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
        ><span
          id="cedmysqlApp.entregaDiploma.delete.question"
          data-cy="entregaDiplomaDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-entregaDiploma-heading" v-text="$t('cedmysqlApp.entregaDiploma.delete.question', { id: removeId })">
          Are you sure you want to delete this Entrega Diploma?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-entregaDiploma"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeEntregaDiploma()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./entrega-diploma.component.ts"></script>
