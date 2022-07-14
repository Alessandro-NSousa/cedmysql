<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="turma">
        <h2 class="jh-entity-heading" data-cy="turmaDetailsHeading">
          <span v-text="$t('cedmysqlApp.turma.detail.title')">Turma</span> {{ turma.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('cedmysqlApp.turma.curso')">Curso</span>
          </dt>
          <dd>
            <span>{{ turma.curso }}</span>
          </dd>
          <dt>
            <span v-text="$t('cedmysqlApp.turma.sigla')">Sigla</span>
          </dt>
          <dd>
            <span>{{ turma.sigla }}</span>
          </dd>
          <dt>
            <span v-text="$t('cedmysqlApp.turma.ano')">Ano</span>
          </dt>
          <dd>
            <span>{{ turma.ano }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="turma.id" :to="{ name: 'TurmaEdit', params: { turmaId: turma.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./turma-details.component.ts"></script>
