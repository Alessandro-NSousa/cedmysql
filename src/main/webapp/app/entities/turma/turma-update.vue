<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="cedmysqlApp.turma.home.createOrEditLabel"
          data-cy="TurmaCreateUpdateHeading"
          v-text="$t('cedmysqlApp.turma.home.createOrEditLabel')"
        >
          Create or edit a Turma
        </h2>
        <div>
          <div class="form-group" v-if="turma.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="turma.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('cedmysqlApp.turma.curso')" for="turma-curso">Curso</label>
            <input
              type="text"
              class="form-control"
              name="curso"
              id="turma-curso"
              data-cy="curso"
              :class="{ valid: !$v.turma.curso.$invalid, invalid: $v.turma.curso.$invalid }"
              v-model="$v.turma.curso.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('cedmysqlApp.turma.sigla')" for="turma-sigla">Sigla</label>
            <input
              type="text"
              class="form-control"
              name="sigla"
              id="turma-sigla"
              data-cy="sigla"
              :class="{ valid: !$v.turma.sigla.$invalid, invalid: $v.turma.sigla.$invalid }"
              v-model="$v.turma.sigla.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('cedmysqlApp.turma.ano')" for="turma-ano">Ano</label>
            <input
              type="text"
              class="form-control"
              name="ano"
              id="turma-ano"
              data-cy="ano"
              :class="{ valid: !$v.turma.ano.$invalid, invalid: $v.turma.ano.$invalid }"
              v-model="$v.turma.ano.$model"
            />
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
            :disabled="$v.turma.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./turma-update.component.ts"></script>
