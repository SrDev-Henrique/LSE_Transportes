# 🚚 LSE Transportes - Website Corporativo

> **Especialistas em transporte refrigerado com controle de temperatura até -12°C**

Um website moderno e responsivo desenvolvido para a LSE Transportes, empresa especializada em transporte de cargas refrigeradas, perecíveis e climatizadas. O projeto apresenta uma interface elegante com foco na conversão de leads e experiência do usuário.

## 📋 Descrição

O website da LSE Transportes é uma plataforma corporativa completa que apresenta os serviços de transporte refrigerado da empresa de forma profissional e atrativa. Desenvolvido com foco na conversão, o site oferece:

- **Apresentação visual impactante** com hero section animado
- **Sistema de orçamento inteligente** com formulário multi-step
- **Integração com WhatsApp** para atendimento direto
- **Design responsivo** otimizado para todos os dispositivos
- **Animações fluidas** com Framer Motion e Lenis
- **Navegação suave** entre seções

### 🎯 Objetivo

Transformar visitantes em clientes através de uma experiência digital que transmite confiança, profissionalismo e facilidade de contato.

### 💼 Público-alvo

Empresas e pessoas físicas que necessitam de transporte refrigerado para alimentos, medicamentos, flores e outros produtos sensíveis à temperatura.

## 🛠️ Tecnologias Utilizadas

### **Frontend**

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca para interface do usuário
- **TypeScript** - Tipagem estática para maior confiabilidade
- **SCSS/Sass** - Pré-processador CSS para estilos avançados

### **Animações & UX**

- **Framer Motion** - Animações fluidas e interativas
- **Lenis** - Scroll suave e otimizado
- **React Icons** - Biblioteca de ícones

### **Formulários & Integração**

- **Formspree** - Processamento de formulários
- **WhatsApp Business API** - Integração direta para atendimento

### **Desenvolvimento**

- **ESLint** - Linting e qualidade de código
- **Turbopack** - Bundler rápido para desenvolvimento

## ✨ Principais Funcionalidades

### 🎨 **Interface Moderna**

- Design responsivo com breakpoints otimizados
- Paleta de cores profissional e acessível
- Tipografia hierárquica com fontes Inter e Poppins
- Layout em grid com flexbox para máxima flexibilidade

### 📱 **Responsividade Completa**

- Mobile-first design
- Adaptação perfeita para tablets e desktops
- Menu mobile com animações suaves
- Touch-friendly interface

### 📝 **Sistema de Orçamento Inteligente**

- Formulário multi-step com validação em tempo real
- Cálculo automático de distância entre endereços
- Estimativa de preço baseada em parâmetros
- Persistência de dados no localStorage
- Integração direta com WhatsApp para envio

### 🔄 **Animações Fluidas**

- Scroll suave entre seções
- Animações de entrada com Framer Motion
- Transições de estado com micro-interações
- Loading states e feedback visual

### 📞 **Integração de Comunicação**

- Botões de contato direto via WhatsApp
- Formulário de mensagem integrado
- Links de email com templates pré-formatados
- Atendimento 24h destacado

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/SrDev-Henrique/LSE_Transportes
cd lse
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
```

3. **Execute o servidor de desenvolvimento**

```bash
npm run dev
# ou
yarn dev
```

4. **Acesse o projeto**

```
http://localhost:3000
```

### Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento com Turbopack
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Verificação de código
```

## 📁 Estrutura de Pastas

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── (sections)/        # Seções da página principal
│   │   ├── About/         # Seção Sobre Nós
│   │   ├── Contact/       # Seção de Contato
│   │   ├── Footer/        # Rodapé
│   │   ├── Hero/          # Seção principal
│   │   ├── Servicos/      # Seção de Serviços
│   │   └── Topics/        # Seção de Diferenciais
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes reutilizáveis
│   ├── Container/         # Container responsivo
│   ├── FormButton/        # Botão de formulário
│   ├── icons/            # Ícones customizados
│   └── NavBar/           # Navegação principal
├── context/              # Contextos React
├── formats/              # Formatadores de input
├── styles/               # Variáveis SCSS
└── utils/                # Utilitários e hooks
```

## 🔧 Diferenciais Técnicos

### **Arquitetura Modular**

- Componentização avançada com separação de responsabilidades
- Hooks personalizados para lógica reutilizável
- Context API para gerenciamento de estado global
- Utilitários para formatação e validação

### **Performance Otimizada**

- Next.js Image para otimização automática de imagens
- Lazy loading de componentes
- Turbopack para desenvolvimento rápido
- Bundle splitting automático

### **Acessibilidade**

- Semântica HTML adequada
- Navegação por teclado
- ARIA labels e roles
- Contraste de cores acessível

### **SEO & Meta Tags**

- Meta tags otimizadas
- Estrutura de dados semântica
- URLs amigáveis
- Sitemap automático

### **Integração Externa**

- API de geocoding para cálculo de distâncias
- Formspree para processamento de formulários
- WhatsApp Business API
- Google Maps integration (preparado)

## 📊 Funcionalidades Avançadas

### **Sistema de Orçamento**

- Formulário multi-step com validação
- Cálculo automático de distância
- Estimativa de preço em tempo real
- Persistência de dados
- Integração com WhatsApp

### **Navegação Inteligente**

- Scroll suave entre seções
- Menu mobile responsivo
- Animações de transição
- Feedback visual de navegação

### **Gestão de Estado**

- Context API para scroll suave
- LocalStorage para persistência
- Estado local para formulários
- Gerenciamento de loading states

## 👨‍💻 Autor

**Desenvolvido com ❤️ para LSE Transportes**

- **Tecnologias:** Next.js, React, TypeScript, SCSS
- **Foco:** Performance, UX e conversão
- **Metodologia:** Mobile-first, Component-driven

---

### 📞 **Contato LSE Transportes**

- **WhatsApp:** (19) 99205-5290
- **Email:** l.a.tagliari@gmail.com
- **Atendimento:** 24 horas

---

_Projeto desenvolvido com as melhores práticas de desenvolvimento web moderno, focado em performance, acessibilidade e experiência do usuário._
