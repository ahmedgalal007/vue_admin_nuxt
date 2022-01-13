<template>
  <v-navigation-drawer
    v-model="pDrawer"
    :mini-variant="pMiniVariant && $vuetify.breakpoint.lgAndUp"
    :clipped="clipped"
    :right="right"
    fixed
    app
    color="primary"
    overlay-color="secondary"
    @mouseenter.native="
      pinned = pMiniVariant
      pMiniVariant = false
    "
    @mouseleave.native="pMiniVariant = pinned"
  >
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Sandra Adams
          </v-list-item-title>
          <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list class="navigation" >
      <v-list-item
        v-for="(item, i) in getItems"
        :key="i"
        :to="item.to"
        router
        exact
        class="navigation-item"
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>

      <v-list-group
        :value="true"
        prepend-icon="mdi-account-circle"
      >
        <template #activator>
          <v-list-item-title>Users</v-list-item-title>
        </template>

        <v-list-group
          :value="true"
          no-action
          sub-group
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon], i) in admins"
            :key="i"
            link
          >
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-title v-text="title"></v-list-item-title>

          </v-list-item>
        </v-list-group>

        <v-list-group
          no-action
          sub-group
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>Actions</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            link
          >
            
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
            
            <v-list-item-title v-text="title"></v-list-item-title>

          </v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'VModernNavigationDrawer',
  props: {
    drawer: { type: Boolean, default: true },
    miniVariant: { type: Boolean, default: false },
    clipped: { type: Boolean, default: false },
    right: { type: Boolean, default: false },
  },
  data() {
    return {
      pDrawer: this.getDrawer,
      pClipped: this.clipped,
      pMiniVariant: this.miniVariant,
      pinned: this.miniVariant,
      pRight: this.right,

      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
      
    }
  },
  computed:{
    getItems(){
      return [
        {
          icon: 'mdi-apps',
          title: this.$t('navbar.welcome'),
          to: this.localePath('/'),
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: this.localePath('/inspire'),
        },
        {
          icon: 'mdi-table',
          title: 'Data Table',
          to: this.localePath('/datatables'),
        },
        {
          icon: 'mdi-login-variant',
          title: 'Login',
          to: this.localePath('/login'),
        },
        {
          icon: 'mdi-account-plus',
          title: 'Register',
          to: this.localePath('/login/register'),
        },
      ];
    }
  },
  methods: {
    toggelDrawer() {
      this.pDrawer = !this.pDrawer
      return this.pDrawer
    },
    toggelPinned() {
      this.pMiniVariant = !this.pMiniVariant
      return this.pMiniVariant
    },
    toggelClipped() {
      this.pClipped = !this.pClipped
      return this.pClipped
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mixins.scss';

:root{
  --blue: #287bff;
  --white:#fff;
  --grey: #f5f5f5;
  --black1: #222;
  --black2: #999;
}

button, [type=button], [type=reset], [type=submit], [role=button]{
    color: var(--v-menu--text-lighten2) !important;
    caret-color: var(--v-primary-darken4) !important;
  }

  .v-list .v-list-item--active:not(.v-list-group__header),
  /* .theme--light.v-list-item--active:hover::before,  */
  .theme--light.v-list-item--active:not(.v-list-group__header)::before,
  .v-list .v-list-item--active:not(.v-list-group__header) .v-icon{
    color: var(--v-primary-base) !important;
    background-color: #FFFFFF !important;
    /* opacity: 1 !important; */
  }
  
    .v-list-item--link:before{
      transition:none;
    }
    #app:not(.v-application--is-rtl){
      .theme--light.v-list-item--active:not(.v-list-group__header)::before,   
      .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled):hover::before{
        @include rounding-outward-top-left(48,10, var(--v-menu--text-lighten2));
      }

      .theme--light.v-list-item--active:not(.v-list-group__header)::after ,
      .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled):hover::after{
        @include rounding-outward-bottom-left(48,10, var(--v-menu--text-lighten2))
      }
      .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled):hover{
        border-top-left-radius: 24px;
        border-bottom-left-radius: 24px;
      }

    }
    
    #app.v-application--is-rtl{
      .theme--light.v-list-item--active:not(.v-list-group__header)::before,   
      .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled):hover::before{
        @include rounding-outward-top-right(48,10, var(--v-menu--text-lighten2));
      }

      .theme--light.v-list-item--active:not(.v-list-group__header)::after ,
      .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled):hover::after{
        @include rounding-outward-bottom-right(48,10, var(--v-menu--text-lighten2))
      }
      .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled):hover{
        border-top-right-radius: 24px;
        border-bottom-right-radius: 24px;
      }
    }

  .theme--light.v-list-item.v-list-item--active::before{
    
    background: var(--v-primary-base) !important;
  }
   .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) + a.v-list-item--active::before
  {
     background: var(--v-primary-base) !important;
  }
  .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled):hover + a.v-list-item--active::before
  {
     background: var(--v-menu--text-lighten2) !important;
  }
  //  a::after + .theme--light.v-list-item--active:not(.v-list-group__header) 
  //  {
  //    color: var(--v-menu--text-lighten2) !important;
  //  }
   a::before + .theme--light.v-list-item--active:not(.v-list-group__header) 
  {
     color: var(--v-menu--text-lighten2) !important;
  }


  .theme--light.v-list-item--active:not(.v-list-group__header) + a:hover::before{
    
     color: var(--v-menu--text-lighten2) !important;
  }
  
  

  .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled):hover,
  .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled):hover .v-icon{
    color: var(--v-primary-base) !important;
    background-color: #FFFFFF !important;
   }
  .v-list-group--sub-group{
    background-color: var(--v-primary-darken2) !important;
    border-bottom: var(--v-primary-lighten4) 1px solid;
  }
  .v-list-group--sub-group > .v-list-group__items > .v-list-item {
    background-color: var(--v-primary-darken3) !important;
    border-top: var(--v-primary-lighten3) 1px solid;
  }

</style>


