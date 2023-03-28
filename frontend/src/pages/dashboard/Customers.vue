<script>
import UserService from "@/services/user.service";
export default {
    data() {
        return {
            users: [],
        };
    },
    methods: {
        async searchUsers(e) {
            const value = e.target.value.trim();
            if (value) {
                try {
                    this.users = await UserService.search(value);
                    this.users.forEach((user) => {
                        const date = new Date(user.updatedAt);
                        user.updatedAt =
                            date.getDate() +
                            "/" +
                            (date.getMonth() + 1) +
                            "/" +
                            date.getFullYear();
                    });
                } catch (e) {
                    console.log(e);
                }
            } else {
                this.refreshList();
            }
        },

        refreshList() {
            this.getUsers();
        },
        changeStatus(user) {
            user.open = !user.open;
            this.editProduct(user._id, { open: user.open });
        },

        async getUsers() {
            try {
                this.users = await UserService.getAll();
                this.users.forEach((user) => {
                    const date = new Date(user.updatedAt);
                    user.updatedAt =
                        date.getDate() +
                        "/" +
                        (date.getMonth() + 1) +
                        "/" +
                        date.getFullYear();
                });
            } catch (error) {
                console.log(error);
            }
        },
        async deleteUser(userId) {
            try {
                const user = await UserService.delete(userId);
            } catch (error) {
                console.log(error);
            }
            this.refreshList();
        },
        async editProduct(id, data) {
            try {
                UserService.update(id, data);
            } catch (e) {
                console.log(e);
            }
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
    
<template>
    <h3 class="db__title">Customers</h3>
<div class="db__content-header">
    <input class="db__content-search" type="text"  placeholder="Search by name/email" @keyup.enter="searchUsers" />
</div>
<div class="db__body" >
    <table>
        <thead>
            <tr>
                <td width="4%"></td>
                <td width="8%">Role</td>
                <td width="20%">ID</td>
                <td width="14%">JOINING DATE</td>
                <td width="18%">Name</td>
                <td width="18%">Email</td>
                <td width="8%">PUBLISHED</td>
                <td width="10%"></td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user, index in users">
                <td class="text-center">
                    <span>{{index + 1}}</span>
                </td>
                <td>
                    <span>{{user.role}}</span>
                </td>
                <td>
                    <span>{{user._id}}</span>
                </td>
                <td>
                    <span>{{user.updatedAt}}</span>
                </td>
                <td>
                    <span>{{user.name}}</span>
                </td>
                <td>
                    <span>{{user.email}}</span>
                </td>
                <td class="user__published">
                        <span class="px-1 py-1" @click="changeStatus(user)">
                            <svg v-if="user.open" stroke="currentColor" style="color: #0e9f6e;" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="text-green-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path>
                            </svg>
                            <svg v-else stroke="currentColor" fill="currentColor" style="color: #e74c3c;" stroke-width="0" viewBox="0 0 16 16" class="text-orange-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"></path>
                            </svg>
                        </span>
                    </td>
                <td class="user__action">
                    <div>
                        <i class="fa-regular fa-trash-can" @click="deleteUser(user._id, $event)"> </i>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>

</template>
    
<style lang='scss' scoped>
.db__content-search {
    flex: 1;
}
.user {
    &__action,
    &__published {
        text-align: center;
        cursor: pointer;
    }
}
</style>
    