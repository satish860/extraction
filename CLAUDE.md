# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Next.js 15.5.2 application using React 19.1.0, TypeScript, Tailwind CSS v4, and ESLint. It was bootstrapped with `create-next-app` and uses Turbopack as the bundler. The application follows the App Router architecture with the entry point at `app/page.tsx`.

## Development Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Architecture
- **App Directory Structure**: Uses Next.js App Router with `app/` directory
- **Layout**: Root layout in `app/layout.tsx` configures Geist fonts and global styles
- **Styling**: Tailwind CSS v4 with custom CSS in `app/globals.css`
- **TypeScript**: Strict configuration with Next.js plugin and path mapping (`@/*` to root)
- **Fonts**: Uses Geist Sans and Geist Mono from `next/font/google`

## Code Conventions
- TypeScript with strict mode enabled
- React 19 features available
- Tailwind CSS utility classes for styling
- ESLint with Next.js core-web-vitals and TypeScript rules
- Path alias `@/*` maps to root directory