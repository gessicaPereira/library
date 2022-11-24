<template>
    <v-row>
            <v-card id="cardEdit" elevation="12" color="#b67dbe" dark>
                <v-card-title>
                    <v-icon size="25" class="mr-1">mdi-bookshelf</v-icon>
                    Total de Editoras
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <p class="text-h6" dark>↪ {{ publishings }}</p>
                </v-card-text>
            </v-card>
            
            <v-card id="cardBook" elevation="12" color="#b67dbe " dark>
                <v-card-title>
                    <v-icon size="25" class="mr-1">mdi-book-multiple</v-icon>
                    Total de Livros
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <p class="text-h6" dark>↪ {{ books }}</p>
                </v-card-text>
            </v-card>
        
        
            <v-card id="user" elevation="12" color="#b67dbe" dark>
                <v-card-title>
                    <v-icon size="25" class="mr-1">mdi-account-multiple</v-icon>
                    Total de Usuários
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <p class="text-h6" dark>↪ {{ users }}</p>
                </v-card-text>
            </v-card>
        
        
            <v-card id="cardRent" elevation="12" color="#b67dbe" dark>
                <v-card-title>
                    <v-icon size="25" class="mr-1">mdi-calendar-blank-multiple</v-icon>
                    Total de Aluguéis
                    <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                    <p class="text-h6" dark>↪ {{ rents }}</p>
                </v-card-text>
            </v-card>
    </v-row>
</template>

<script>
import rent from '@/service/rent';
import booksService from '@/service/booksService';
import publishing from '@/service/publishing';
import usersService from '@/service/usersService';

export default {
    name: 'CardTotals',
    data: () => {
        return {
            rents: 0,
            books: 0,
            users: 0,
            publishings: 0
        };
    },
    methods: {
        getRent() {
            rent.getAll().then(res => {
                this.rents = res.data.content.length;
            });
        },
        getBook() {
            booksService.getAll().then(res => {
                this.books = res.data.content.length;
            });
        },
        getUser() {
            usersService.getAll().then(res => {
                this.users = res.data.content.length;
            });
        },
        getPublishing() {
            publishing.getAll().then(res => {
                this.publishings = res.data.content.length;
            });
        },
    },
    mounted() {
        this.getRent();
        this.getBook();
        this.getUser();
        this.getPublishing();
    }
};
</script>

<style>
#cardBook{
    margin-left: 40px;
    margin-top: 20px;
    padding: 20px;
}
#user{
    margin-left: 40px;
    margin-top: 20px;
    padding: 20px;
}
#cardEdit{
    margin-left: 40px;
    margin-top: 20px;
    padding: 20px;
}
#cardRent{
    margin-left: 40px;
    margin-top: 20px;
    padding: 20px;
}

</style>