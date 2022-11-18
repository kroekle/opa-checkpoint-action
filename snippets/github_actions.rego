package data.global.github_actions

#############################################################################
# METADATA: library-snippet/custom
# version: v1
# title: "Restrict paths"
# description: >-
#   Restrict certain paths to be updated by only individual users, else be
#   reviewed by those users.
# filePath:
# - systems/.*/actions/.*
# schema:
#   type: object
#   properties:
#     path:
#       type: string
#       title: "Path"
#     branch:
#       type: string
#       title: "Branch"
#     user:
#       type: string
#       title: "User"
#   decision:
#     - type: rego
#       key: result
#       value: "res"
# policy:
#   rule:
#     type: rego
#     value: "{{this}}[res]"
#############################################################################
check[res] {
    check_ref
    

    res := {
        "message": sprintf("%v needs to approve access to path: %v", [data.library.parameters.user, data.library.parameters.path])
    }
}

check_ref {
    input.Value.eventName == "pull_request"
    input.Value.payload.pull_request.base.ref == data.library.parameters.branch
}

check_ref {
    input.Value.eventName == "push"
    input.Value.ref == sprintf("refs/heads/%v", [data.library.parameters.branch])
}