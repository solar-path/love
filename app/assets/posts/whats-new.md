---
author: Aneko Team
date: 2025-01-06
---

# What's new

Track changes in Aneko.

## 2025-01-05

### Define public routes

- docs page
- pricing page
- terms of use
- privacy policy
- authentication

  - login via Drawer
  - register via Drawer
  - forgot password via Drawer

### Define components

- **QInput** - _extended input components with predefined list of values_
- **QDrawer** - _display side forms_
- **QToast** - _display flash messages_
- **QTree** (changes required) - _render tree_
- **QFooter** - _display footer_
- **QHeader** (continious changes) - _display navigation_

### Define admin routes

- crm
  - inquiry
    - inquiry form
    - track inquiry form
    - blank inquiry page

### Lower database load

1. replace database tables industry and country with jsons (no mutable data)

   - drop tables
   - drop seed scripts
   - create and clear jsons with industry and country data

## 2025-01-06

### QInput

- resolve issues with type definitions
- pass icon as property

### AddressBook

- add contact data
- add contact page
- add address book page
