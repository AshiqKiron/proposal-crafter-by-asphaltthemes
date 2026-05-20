=== Proposal Crafter by Asphalt Themes ===
Contributors: asphaltthemes
Tags: proposal, wordpress proposal, proposal software, business proposal, client proposal
Requires at least: 6.5
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 0.0.2
License: GPLv3 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.html

This project is developed using a Docker-based workflow to ensure consistency across environments.

## Prerequisite
* Docker & Docker Compose

## 🚀 Getting Started

1.  **Start the environment:**
    Copy the docker configuration files from `dev-docs/` to your project root if you haven't already:
    ```bash
    cp dev-docs/docker-compose.yaml dev-docs/Dockerfile dev-docs/.env dev-docs/env-ex.txt ./
    ```
    Then start Docker from the root:
    ```bash
    docker compose up -d --build
    ```
    This will start:
    *   **WordPress** (PHP 7.4)
    *   **Nginx** (Web Server)
    *   **MariaDB** (Database)
    *   **PHPMyAdmin** (Database Manager)

    Once started, the site will be available at: `http://localhost:<WEB_PORT>` (check your `.env` file).

2.  **Setup Project (Composer + Node):**
    Run the setup script inside the node container:
    ```bash
    docker compose run --rm node pnpm run setup
    ```

---

## 🛠️ Development

### **PHP Commands**
Run these commands from the project root:

*   **Install/Update Dependencies:**
    ```bash
    docker compose exec php sh -c "cd wp-content/plugins/asphalt-proposal-manager && composer update"
    ```
*   **Run Code Sniffer (Linting):**
    ```bash
    docker compose exec php sh -c "cd wp-content/plugins/asphalt-proposal-manager && composer phpcs"
    ```
*   **Fix Code Style Automatically:**
    ```bash
    docker compose exec php sh -c "cd wp-content/plugins/asphalt-proposal-manager && composer format"
    ```

### **JavaScript/CSS Assets**
All asset compilation is handled by the `node` service. Run from project root:

*   **Watch for Changes (Hot Reload/Dev Mode):**
    ```bash
    docker compose run --rm -p 8887:8887 node pnpm start:hot
    ```
    *Note: The `-p 8887:8887` flag maps the hot-module-replacement port so your browser can connect to it.*

*   **Dev Build:**
    ```bash
    docker compose run --rm node pnpm start
    ```

---

## 📦 Build for Production

To create a production-ready build, run this from the project root:

```bash
docker compose run --rm node pnpm build
```

This command will:
1.  Run `composer build` (installs separate vendor directory without dev dependencies).
2.  Run `pnpm minify` (compiles and minifies JS/CSS).
3.  Run `grunt-build` (generates translations (POT) and other tasks).
4.  Run `compress` (packages the plugin into a zip file in `__build/`).
