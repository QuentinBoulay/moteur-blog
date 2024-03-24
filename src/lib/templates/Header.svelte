<script>
    import { goto } from '$app/navigation';
    import "../../styles/global.css";

</script>

<nav>
    <ul>
        <li><a href="/">Accueil</a></li>
        <li><a href="/categories">Catégories</a></li>
    </ul>
</nav>

<style>
    nav {
        background-color: #f0f0f0;
        padding: 10px;
        margin-bottom: 20px;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        display: inline;
        margin-right: 10px;
    }

    a {
        text-decoration: none;
        color: #000;
    }

    a:hover {
        text-decoration: underline;
    }
</style>