<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="cedmysqlApp.entregaDiploma.home.createOrEditLabel"
          data-cy="EntregaDiplomaCreateUpdateHeading"
          v-text="$t('cedmysqlApp.entregaDiploma.home.createOrEditLabel')"
        >
          Create or edit a EntregaDiploma
        </h2>
        <div>
          <div class="form-group" v-if="entregaDiploma.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="entregaDiploma.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('cedmysqlApp.entregaDiploma.dataDeEntrega')" for="entrega-diploma-dataDeEntrega"
              >Data De Entrega</label
            >
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="entrega-diploma-dataDeEntrega"
                  v-model="$v.entregaDiploma.dataDeEntrega.$model"
                  name="dataDeEntrega"
                  class="form-control"
                  :locale="currentLanguage"
                  button-only
                  today-button
                  reset-button
                  close-button
                >
                </b-form-datepicker>
              </b-input-group-prepend>
              <b-form-input
                id="entrega-diploma-dataDeEntrega"
                data-cy="dataDeEntrega"
                type="text"
                class="form-control"
                name="dataDeEntrega"
                :class="{ valid: !$v.entregaDiploma.dataDeEntrega.$invalid, invalid: $v.entregaDiploma.dataDeEntrega.$invalid }"
                v-model="$v.entregaDiploma.dataDeEntrega.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('cedmysqlApp.entregaDiploma.observacoes')" for="entrega-diploma-observacoes"
              >Observacoes</label
            >
            <textarea
              class="form-control"
              name="observacoes"
              id="entrega-diploma-observacoes"
              data-cy="observacoes"
              :class="{ valid: !$v.entregaDiploma.observacoes.$invalid, invalid: $v.entregaDiploma.observacoes.$invalid }"
              v-model="$v.entregaDiploma.observacoes.$model"
            ></textarea>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.entregaDiploma.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./entrega-diploma-update.component.ts"></script>
