<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="cedmysqlApp.processo.home.createOrEditLabel"
          data-cy="ProcessoCreateUpdateHeading"
          v-text="$t('cedmysqlApp.processo.home.createOrEditLabel')"
        >
          Create or edit a Processo
        </h2>
        <div>
          <div class="form-group" v-if="processo.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="processo.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('cedmysqlApp.processo.statusProcesso')" for="processo-statusProcesso"
              >Status Processo</label
            >
            <select
              class="form-control"
              name="statusProcesso"
              :class="{ valid: !$v.processo.statusProcesso.$invalid, invalid: $v.processo.statusProcesso.$invalid }"
              v-model="$v.processo.statusProcesso.$model"
              id="processo-statusProcesso"
              data-cy="statusProcesso"
            >
              <option
                v-for="statusProcesso in statusProcessoValues"
                :key="statusProcesso"
                v-bind:value="statusProcesso"
                v-bind:label="$t('cedmysqlApp.StatusProcesso.' + statusProcesso)"
              >
                {{ statusProcesso }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('cedmysqlApp.processo.matricula')" for="processo-matricula">Matricula</label>
            <input
              type="text"
              class="form-control"
              name="matricula"
              id="processo-matricula"
              data-cy="matricula"
              :class="{ valid: !$v.processo.matricula.$invalid, invalid: $v.processo.matricula.$invalid }"
              v-model="$v.processo.matricula.$model"
              required
            />
            <div v-if="$v.processo.matricula.$anyDirty && $v.processo.matricula.$invalid">
              <small class="form-text text-danger" v-if="!$v.processo.matricula.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('cedmysqlApp.processo.nome')" for="processo-nome">Nome</label>
            <input
              type="text"
              class="form-control"
              name="nome"
              id="processo-nome"
              data-cy="nome"
              :class="{ valid: !$v.processo.nome.$invalid, invalid: $v.processo.nome.$invalid }"
              v-model="$v.processo.nome.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('cedmysqlApp.processo.data')" for="processo-data">Data</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="processo-data"
                  v-model="$v.processo.data.$model"
                  name="data"
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
                id="processo-data"
                data-cy="data"
                type="text"
                class="form-control"
                name="data"
                :class="{ valid: !$v.processo.data.$invalid, invalid: $v.processo.data.$invalid }"
                v-model="$v.processo.data.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('cedmysqlApp.processo.numeroDaDefesa')" for="processo-numeroDaDefesa"
              >Numero Da Defesa</label
            >
            <input
              type="text"
              class="form-control"
              name="numeroDaDefesa"
              id="processo-numeroDaDefesa"
              data-cy="numeroDaDefesa"
              :class="{ valid: !$v.processo.numeroDaDefesa.$invalid, invalid: $v.processo.numeroDaDefesa.$invalid }"
              v-model="$v.processo.numeroDaDefesa.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('cedmysqlApp.processo.statusSigaa')" for="processo-statusSigaa"
              >Status Sigaa</label
            >
            <select
              class="form-control"
              name="statusSigaa"
              :class="{ valid: !$v.processo.statusSigaa.$invalid, invalid: $v.processo.statusSigaa.$invalid }"
              v-model="$v.processo.statusSigaa.$model"
              id="processo-statusSigaa"
              data-cy="statusSigaa"
            >
              <option v-for="status in statusValues" :key="status" v-bind:value="status" v-bind:label="$t('cedmysqlApp.Status.' + status)">
                {{ status }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('cedmysqlApp.processo.numeroSipac')" for="processo-numeroSipac"
              >Numero Sipac</label
            >
            <input
              type="text"
              class="form-control"
              name="numeroSipac"
              id="processo-numeroSipac"
              data-cy="numeroSipac"
              :class="{ valid: !$v.processo.numeroSipac.$invalid, invalid: $v.processo.numeroSipac.$invalid }"
              v-model="$v.processo.numeroSipac.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('cedmysqlApp.processo.enviadoBiblioteca')" for="processo-enviadoBiblioteca"
              >Enviado Biblioteca</label
            >
            <select
              class="form-control"
              name="enviadoBiblioteca"
              :class="{ valid: !$v.processo.enviadoBiblioteca.$invalid, invalid: $v.processo.enviadoBiblioteca.$invalid }"
              v-model="$v.processo.enviadoBiblioteca.$model"
              id="processo-enviadoBiblioteca"
              data-cy="enviadoBiblioteca"
            >
              <option
                v-for="enviado in enviadoValues"
                :key="enviado"
                v-bind:value="enviado"
                v-bind:label="$t('cedmysqlApp.Enviado.' + enviado)"
              >
                {{ enviado }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('cedmysqlApp.processo.turma')" for="processo-turma">Turma</label>
            <select class="form-control" id="processo-turma" data-cy="turma" name="turma" v-model="processo.turma">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="processo.turma && turmaOption.id === processo.turma.id ? processo.turma : turmaOption"
                v-for="turmaOption in turmas"
                :key="turmaOption.id"
              >
                {{ turmaOption.ano }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('cedmysqlApp.processo.entregaDiploma')" for="processo-entregaDiploma"
              >Entrega Diploma</label
            >
            <select
              class="form-control"
              id="processo-entregaDiploma"
              data-cy="entregaDiploma"
              name="entregaDiploma"
              v-model="processo.entregaDiploma"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  processo.entregaDiploma && entregaDiplomaOption.id === processo.entregaDiploma.id
                    ? processo.entregaDiploma
                    : entregaDiplomaOption
                "
                v-for="entregaDiplomaOption in entregaDiplomas"
                :key="entregaDiplomaOption.id"
              >
                {{ entregaDiplomaOption.dataDeEntrega }}
              </option>
            </select>
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
            :disabled="$v.processo.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./processo-update.component.ts"></script>
