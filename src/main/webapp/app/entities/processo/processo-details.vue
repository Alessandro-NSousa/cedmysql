<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="processo">
        <h2 class="jh-entity-heading" data-cy="processoDetailsHeading">
          <span v-text="$t('cedmysqlApp.processo.detail.title')">Processo</span> {{ processo.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('cedmysqlApp.processo.statusProcesso')">Status Processo</span>
          </dt>
          <dd>
            <span v-text="$t('cedmysqlApp.StatusProcesso.' + processo.statusProcesso)">{{ processo.statusProcesso }}</span>
          </dd>
          <dt>
            <span v-text="$t('cedmysqlApp.processo.matricula')">Matricula</span>
          </dt>
          <dd>
            <span>{{ processo.matricula }}</span>
          </dd>
          <dt>
            <span v-text="$t('cedmysqlApp.processo.nome')">Nome</span>
          </dt>
          <dd>
            <span>{{ processo.nome }}</span>
          </dd>
          <dt>
            <span v-text="$t('cedmysqlApp.processo.data')">Data</span>
          </dt>
          <dd>
            <span>{{ processo.data }}</span>
          </dd>
          <dt>
            <span v-text="$t('cedmysqlApp.processo.numeroDaDefesa')">Numero Da Defesa</span>
          </dt>
          <dd>
            <span>{{ processo.numeroDaDefesa }}</span>
          </dd>
          <dt>
            <span v-text="$t('cedmysqlApp.processo.statusSigaa')">Status Sigaa</span>
          </dt>
          <dd>
            <span v-text="$t('cedmysqlApp.Status.' + processo.statusSigaa)">{{ processo.statusSigaa }}</span>
          </dd>
          <dt>
            <span v-text="$t('cedmysqlApp.processo.numeroSipac')">Numero Sipac</span>
          </dt>
          <dd>
            <span>{{ processo.numeroSipac }}</span>
          </dd>
          <dt>
            <span v-text="$t('cedmysqlApp.processo.enviadoBiblioteca')">Enviado Biblioteca</span>
          </dt>
          <dd>
            <span v-text="$t('cedmysqlApp.Enviado.' + processo.enviadoBiblioteca)">{{ processo.enviadoBiblioteca }}</span>
          </dd>
          <dt>
            <span v-text="$t('cedmysqlApp.processo.turma')">Turma</span>
          </dt>
          <dd>
            <div v-if="processo.turma">
              <router-link :to="{ name: 'TurmaView', params: { turmaId: processo.turma.id } }">{{ processo.turma.ano }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('cedmysqlApp.processo.entregaDiploma')">Entrega Diploma</span>
          </dt>
          <dd>
            <div v-if="processo.entregaDiploma">
              <router-link :to="{ name: 'EntregaDiplomaView', params: { entregaDiplomaId: processo.entregaDiploma.id } }">{{
                processo.entregaDiploma.dataDeEntrega
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="processo.id" :to="{ name: 'ProcessoEdit', params: { processoId: processo.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./processo-details.component.ts"></script>
