<script>
/**
 * Auth-layout
 */
export default {
    data() {
        return {

        }
    },
  middleware: 'nonAuthentication'
}
</script>

<template>
<div>
    <div class="account-pages mt-5 mb-5">
        <div class="container">
            <Nuxt />
        </div>
        <!-- end container -->
    </div>
    <!-- end page -->
    <footer class="footer footer-alt">
        {{new Date().getFullYear()}} &copy; Develop By <a href="">Oria Soft</a>
    </footer>
</div>
</template>
