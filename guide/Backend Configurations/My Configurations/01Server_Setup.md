# Prelevels Deployment Guide

This guide outlines the steps to deploy the **Prelevels** project on a KVM 2 Hostinger server. The project source code is located at `/home/projectDir/prelevels`.

---

## Backend (Django) Deployment

### Step 1: Install Required Packages

Update the server and install necessary dependencies:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install python3-pip python3-venv postgresql postgresql-contrib nginx
```
