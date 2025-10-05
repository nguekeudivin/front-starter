# Instroduction

This starter kit is indented to serve as a base for every frontend project. I integrated components, libraries, pages, and some features to quick building an application.

# Features 

## Resource Store 

### items
### current
### synchronisation
- When doing updateCurrent the sync is set automatically to true. We are thinking of adding sync = true by default on create and update as well.


## UI Stores : Errors, Loading, Display

Errors are handle with use-errors, use-loading and use-display.

## Global Store.

## Request Request

## Form Management
- Form management is handle with `use-simple-form`ß and form input. 
- Use introduce a store binding to current form. So that we can directly update the current item. The state is only update when we call the `setValue`. Knowing that it's important to handle the `useState` correctly.

## Resource component structures

### Resource form

### Resource modals ( create, edit, view, delete)

### Resource meta

### Resource table

### Resource listing

### Resource page with tabs

### Resource page details

# Changes Logs 

## 02 October 2025
- Migrate Completely every store logic into global store
- Remove the use-interact hook
