<template>
    <header class="navigation__header">

        <nav class="navigation">

            <div class="navigation__iconbox">
                <MenuIcon @click="toggleNav" class="navigation__icon" :class="{'navigation__icon-active' : nav}">
                </MenuIcon>
            </div>

            <ul class="navigation__ul" :class="{'active' : nav}" @click="toggleNav">
                <li class="navigation__li--header">
                    <div class="area area__server">
                        <h1 class="area__server__h1 size--half">
                            <span class="area__server__icon"></span>
                            <span class="lightblue">La</span>Familia
                        </h1>
                    </div>
                </li>
                <li class="navigation__li">
                    <routerLink class="navigation__link" :to="{name: 'GameServerList'}">Home</routerLink>
                </li>
                <li class="navigation__li">
                    <routerLink class="navigation__link" :to="{name: 'MediaList'}">Media</routerLink>
                </li>

                <li class="navigation__li--footer">
                    <span class="navigation__link router-link-active smaller">
                        &copy; 2022 borkee.de <strong class="color-white">//</strong> made with <span
                            class="heart">♥️</span> in
                        Goldbach
                    </span>
                </li>
            </ul>



        </nav>

    </header>
</template>

<script>
import MenuIcon from 'vue-material-design-icons/Menu.vue';

export default {
    name: 'NavigationMain',
    components: {
        MenuIcon,
    },
    data() {
        return {
            nav: null,
            windowWidth: null,
            mobile: null,
        }
    },
    created() {
        window.addEventListener('resize', this.checkScreen);
        this.checkScreen();
    },
    methods: {
        toggleNav() {
            this.nav = !this.nav;
        },

        checkScreen() {
            this.windowWidth = window.innerWidth;
            if (this.windowWidth <= 750) {
                this.mobile = true;
                return;
            }
            this.mobile = false;
            return;
        }
    }
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/colors";

.navigation {
    transition: .3s ease all;
    // display: flex;
    // flex-direction: row;
    // padding:12px 0;
    // width:90%;
    // margin: 0 auto;

    &__header {
        z-index: 99;
        width: 100%;
        position: fixed;
        transition: .3s ease all;
    }

    &__ul,
    &__link {
        font-weight: 500;
        color: colors.$white;
        text-decoration: none;
        list-style: none;
    }

    &__ul {
        //background:colors.$blue--dark;
        background: colors.$blue;
        position: fixed;
        top: 0;
        left: 0;
        padding: 0 0;
        margin: 0;
        width: 240px;
        max-width: 90vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        transform: translateX(-100%);
        transition: .3s ease all;
        box-shadow: 0 0 40px rgba(colors.$black, 0);
        

        &:after {
            content: "";
            display: block;
            width: 0vw;
            height: 100vw;
            position: fixed;
            z-index: -1;
            transition: .3s ease all;
            opacity:0;
        }

        &.active {
            transform: translateX(0%);
            box-shadow: 0 0 40px rgba(colors.$black, 0.5);

            &:after {
                opacity: 0.25;
                width:500vw;
                background: rgba(0, 0, 0, 1);
                transform: translateX(240px);
            }
        }

    }

    &__li {
        text-transform: uppercase;
        padding: 0;
        margin-left: 0;

        &--header {
            margin-bottom: 16px;
            border-bottom: 1px solid colors.$white;

            .area {
                padding: 16px 0;

                &::before,
                &:after {
                    display: none;
                }
            }
        }

        &--footer {
            height: 100%;
            display: flex;
            align-items: flex-end;

        }
    }

    &__link {
        font-size: 14px;
        transition: .3 ease all;
        padding: 8px 16px;
        border-bottom: 1px solid transparent;
        cursor: pointer;
        display: block;

        &:hover,
        &.router-link-active {
            // border-color: colors.$green;
            background: colors.$blue--dark;
        }
    }

    &__icon {
        display: block;
        cursor: pointer;
        transition: .3s ease all;
        position: relative;
        top: 2px;
        transform-origin: 50% 45%;

        // box-sizing: border-box;
        // align-items: center;
        // position: absolute;
        // right:24px;
        // height:24px;
        &:after {
            content: "";
            border-radius: 50%;
            position: absolute;
            left: 0;
            width: 24px;
            height: 24px;
            background: transparent;
            box-shadow: 0 0 0 0 transparent;
            transition: .3s ease all;
        }

        &:hover {
            &:after {
                background: rgba(colors.$white, 0.25);
                box-shadow: 0 0 0 4px rgba(colors.$white, 0.25);
            }
        }

        &-active {
            transform: rotate(180deg);
        }

        &box {
            // position: relative;
            display: flex;
            justify-content: center;
        }

        svg {
            cursor: pointer;
            background: red;
        }
    }
}
</style>