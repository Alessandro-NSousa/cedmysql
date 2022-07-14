<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="entregaDiploma">
        <h2 class="jh-entity-heading" data-cy="entregaDiplomaDetailsHeading">
          <span v-text="$t('cedmysqlApp.entregaDiploma.detail.title')">EntregaDiploma</span> {{ entregaDiploma.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('cedmysqlApp.entregaDiploma.dataDeEntrega')">Data De Entrega</span>
          </dt>
          <dd>
            <span>{{ entregaDiploma.dataDeEntrega }}</span>
          </dd>
          <dt>
            <span v-text="$t('cedmysqlApp.entregaDiploma.observacoes')">Observacoes</span>
          </dt>
          <dd>
            <span>{{ entregaDiploma.observacoes }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="entregaDiploma.id"
          :to="{ name: 'EntregaDiplomaEdit', params: { entregaDiplomaId: entregaDiploma.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./entrega-diploma-details.component.ts"></script>
