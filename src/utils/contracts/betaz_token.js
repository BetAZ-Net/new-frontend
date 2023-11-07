const betaz_token_contract = {
  CONTRACT_ADDRESS: "5H8Vfz5yDK4w3gVkQgFViRFCKcfTLFgj3GUremH8ZQMws9c9",
  CONTRACT_ABI: {
    source: {
      hash: "0x26ecb108df7bfb67d4e8f365df5520f072534ed101dc79cdfee6d7e712445761",
      language: "ink! 4.3.0",
      compiler: "rustc 1.75.0-nightly",
      build_info: {
        build_mode: "Debug",
        cargo_contract_version: "3.2.0",
        rust_toolchain: "nightly-x86_64-unknown-linux-gnu",
        wasm_opt_settings: {
          keep_debug_symbols: false,
          optimization_passes: "Z",
        },
      },
    },
    contract: {
      name: "bet_az",
      version: "1.0.0",
      authors: ["bet_a0 <admin@betA0.net>"],
    },
    spec: {
      constructors: [
        {
          args: [
            {
              label: "name",
              type: {
                displayName: ["Option"],
                type: 9,
              },
            },
            {
              label: "symbol",
              type: {
                displayName: ["Option"],
                type: 9,
              },
            },
            {
              label: "decimal",
              type: {
                displayName: ["u8"],
                type: 3,
              },
            },
            {
              label: "token_ratio",
              type: {
                displayName: ["u32"],
                type: 5,
              },
            },
            {
              label: "max_buy_amount",
              type: {
                displayName: ["Balance"],
                type: 0,
              },
            },
            {
              label: "minter",
              type: {
                displayName: ["AccountId"],
                type: 1,
              },
            },
            {
              label: "limit_time_buy",
              type: {
                displayName: ["Timestamp"],
                type: 8,
              },
            },
          ],
          default: false,
          docs: [],
          label: "new",
          payable: false,
          returnType: {
            displayName: ["ink_primitives", "ConstructorResult"],
            type: 10,
          },
          selector: "0x9bae9d5e",
        },
      ],
      docs: [],
      environment: {
        accountId: {
          displayName: ["AccountId"],
          type: 1,
        },
        balance: {
          displayName: ["Balance"],
          type: 0,
        },
        blockNumber: {
          displayName: ["BlockNumber"],
          type: 5,
        },
        chainExtension: {
          displayName: ["ChainExtension"],
          type: 39,
        },
        hash: {
          displayName: ["Hash"],
          type: 33,
        },
        maxEventTopics: 4,
        timestamp: {
          displayName: ["Timestamp"],
          type: 8,
        },
      },
      events: [
        {
          args: [
            {
              docs: [],
              indexed: true,
              label: "from",
              type: {
                displayName: ["Option"],
                type: 32,
              },
            },
            {
              docs: [],
              indexed: true,
              label: "to",
              type: {
                displayName: ["Option"],
                type: 32,
              },
            },
            {
              docs: [],
              indexed: false,
              label: "value",
              type: {
                displayName: ["Balance"],
                type: 0,
              },
            },
          ],
          docs: [],
          label: "Transfer",
        },
        {
          args: [
            {
              docs: [],
              indexed: true,
              label: "owner",
              type: {
                displayName: ["AccountId"],
                type: 1,
              },
            },
            {
              docs: [],
              indexed: true,
              label: "spender",
              type: {
                displayName: ["AccountId"],
                type: 1,
              },
            },
            {
              docs: [],
              indexed: false,
              label: "value",
              type: {
                displayName: ["Balance"],
                type: 0,
              },
            },
          ],
          docs: [],
          label: "Approval",
        },
      ],
      lang_error: {
        displayName: ["ink", "LangError"],
        type: 11,
      },
      messages: [
        {
          args: [
            {
              label: "player",
              type: {
                displayName: ["AccountId"],
                type: 1,
              },
            },
            {
              label: "amount",
              type: {
                displayName: ["Balance"],
                type: 0,
              },
            },
          ],
          default: false,
          docs: [],
          label: "reward_token",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 12,
          },
          selector: "0x0b067d01",
        },
        {
          args: [
            {
              label: "value",
              type: {
                displayName: ["betaztrait_external", "WithdrawInput1"],
                type: 0,
              },
            },
          ],
          default: false,
          docs: [" Withdraw any Balance of Contract - only Owner"],
          label: "BetAZTrait::withdraw",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 12,
          },
          selector: "0x008cfce2",
        },
        {
          args: [
            {
              label: "limit_time_buy",
              type: {
                displayName: ["betaztrait_external", "SetLimitTimeBuyInput1"],
                type: 8,
              },
            },
          ],
          default: false,
          docs: [" Set buy token status"],
          label: "BetAZTrait::set_limit_time_buy",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 12,
          },
          selector: "0x8f4b3c70",
        },
        {
          args: [],
          default: false,
          docs: [" Get token ratio"],
          label: "BetAZTrait::get_token_ratio",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 20,
          },
          selector: "0x17c2dbc6",
        },
        {
          args: [],
          default: false,
          docs: [],
          label: "BetAZTrait::get_end_time_buy",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 21,
          },
          selector: "0x9169a5fe",
        },
        {
          args: [
            {
              label: "token_ratio",
              type: {
                displayName: ["betaztrait_external", "SetTokenRatioInput1"],
                type: 5,
              },
            },
          ],
          default: false,
          docs: [" Set token ratio"],
          label: "BetAZTrait::set_token_ratio",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 12,
          },
          selector: "0x76a14475",
        },
        {
          args: [
            {
              label: "buy_token_status",
              type: {
                displayName: ["betaztrait_external", "SetBuyTokenStatusInput1"],
                type: 4,
              },
            },
          ],
          default: false,
          docs: [" Set buy token status"],
          label: "BetAZTrait::set_buy_token_status",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 12,
          },
          selector: "0x999e57af",
        },
        {
          args: [],
          default: false,
          docs: [" Get limit time buy"],
          label: "BetAZTrait::get_limit_time_buy",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 21,
          },
          selector: "0x7ff5f380",
        },
        {
          args: [
            {
              label: "address",
              type: {
                displayName: ["betaztrait_external", "SetAdminAddressInput1"],
                type: 1,
              },
            },
          ],
          default: false,
          docs: [],
          label: "BetAZTrait::set_admin_address",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 12,
          },
          selector: "0x639c8f06",
        },
        {
          args: [
            {
              label: "account",
              type: {
                displayName: ["betaztrait_external", "MintInput1"],
                type: 1,
              },
            },
            {
              label: "amount",
              type: {
                displayName: ["betaztrait_external", "MintInput2"],
                type: 0,
              },
            },
          ],
          default: false,
          docs: [" Only minter can mint"],
          label: "BetAZTrait::mint",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 12,
          },
          selector: "0xec556c02",
        },
        {
          args: [],
          default: false,
          docs: [" Get amount token sold"],
          label: "BetAZTrait::get_amount_token_sold",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 22,
          },
          selector: "0x1922ed1c",
        },
        {
          args: [],
          default: false,
          docs: [" Get max buy amount"],
          label: "BetAZTrait::get_max_buy_amount",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 22,
          },
          selector: "0xc39a0447",
        },
        {
          args: [
            {
              label: "max_buy_amount",
              type: {
                displayName: ["betaztrait_external", "SetMaxBuyAmountInput1"],
                type: 0,
              },
            },
          ],
          default: false,
          docs: [" Set max buy amount"],
          label: "BetAZTrait::set_max_buy_amount",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 12,
          },
          selector: "0xd9754de6",
        },
        {
          args: [],
          default: false,
          docs: [],
          label: "BetAZTrait::change_state",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 12,
          },
          selector: "0x3bb03682",
        },
        {
          args: [
            {
              label: "address",
              type: {
                displayName: ["betaztrait_external", "IsAdminAddressInput1"],
                type: 1,
              },
            },
          ],
          default: false,
          docs: [],
          label: "BetAZTrait::is_admin_address",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 23,
          },
          selector: "0x2e57538f",
        },
        {
          args: [],
          default: false,
          docs: [" Get buy token status"],
          label: "BetAZTrait::get_buy_token_status",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 23,
          },
          selector: "0xc1ae2921",
        },
        {
          args: [],
          default: false,
          docs: [" Buy token function"],
          label: "BetAZTrait::buy_token",
          mutates: true,
          payable: true,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 12,
          },
          selector: "0x5b5e91fc",
        },
        {
          args: [
            {
              label: "owner",
              type: {
                displayName: ["psp22_external", "AllowanceInput1"],
                type: 1,
              },
            },
            {
              label: "spender",
              type: {
                displayName: ["psp22_external", "AllowanceInput2"],
                type: 1,
              },
            },
          ],
          default: false,
          docs: [],
          label: "PSP22::allowance",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 22,
          },
          selector: "0x4d47d921",
        },
        {
          args: [],
          default: false,
          docs: [],
          label: "PSP22::total_supply",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 22,
          },
          selector: "0x162df8c2",
        },
        {
          args: [
            {
              label: "to",
              type: {
                displayName: ["psp22_external", "TransferInput1"],
                type: 1,
              },
            },
            {
              label: "value",
              type: {
                displayName: ["psp22_external", "TransferInput2"],
                type: 0,
              },
            },
            {
              label: "data",
              type: {
                displayName: ["psp22_external", "TransferInput3"],
                type: 24,
              },
            },
          ],
          default: false,
          docs: [],
          label: "PSP22::transfer",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 25,
          },
          selector: "0xdb20f9f5",
        },
        {
          args: [
            {
              label: "spender",
              type: {
                displayName: ["psp22_external", "DecreaseAllowanceInput1"],
                type: 1,
              },
            },
            {
              label: "delta_value",
              type: {
                displayName: ["psp22_external", "DecreaseAllowanceInput2"],
                type: 0,
              },
            },
          ],
          default: false,
          docs: [],
          label: "PSP22::decrease_allowance",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 25,
          },
          selector: "0xfecb57d5",
        },
        {
          args: [
            {
              label: "spender",
              type: {
                displayName: ["psp22_external", "IncreaseAllowanceInput1"],
                type: 1,
              },
            },
            {
              label: "delta_value",
              type: {
                displayName: ["psp22_external", "IncreaseAllowanceInput2"],
                type: 0,
              },
            },
          ],
          default: false,
          docs: [],
          label: "PSP22::increase_allowance",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 25,
          },
          selector: "0x96d6b57a",
        },
        {
          args: [
            {
              label: "from",
              type: {
                displayName: ["psp22_external", "TransferFromInput1"],
                type: 1,
              },
            },
            {
              label: "to",
              type: {
                displayName: ["psp22_external", "TransferFromInput2"],
                type: 1,
              },
            },
            {
              label: "value",
              type: {
                displayName: ["psp22_external", "TransferFromInput3"],
                type: 0,
              },
            },
            {
              label: "data",
              type: {
                displayName: ["psp22_external", "TransferFromInput4"],
                type: 24,
              },
            },
          ],
          default: false,
          docs: [],
          label: "PSP22::transfer_from",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 25,
          },
          selector: "0x54b3c76e",
        },
        {
          args: [
            {
              label: "owner",
              type: {
                displayName: ["psp22_external", "BalanceOfInput1"],
                type: 1,
              },
            },
          ],
          default: false,
          docs: [],
          label: "PSP22::balance_of",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 22,
          },
          selector: "0x6568382f",
        },
        {
          args: [],
          default: false,
          docs: [],
          label: "PSP22Metadata::token_decimals",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 27,
          },
          selector: "0x7271b782",
        },
        {
          args: [],
          default: false,
          docs: [],
          label: "PSP22Metadata::token_name",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 28,
          },
          selector: "0x3d261bd4",
        },
        {
          args: [],
          default: false,
          docs: [],
          label: "PSP22Metadata::token_symbol",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 28,
          },
          selector: "0x34205be5",
        },
        {
          args: [
            {
              label: "account",
              type: {
                displayName: ["psp22mintable_external", "MintInput1"],
                type: 1,
              },
            },
            {
              label: "amount",
              type: {
                displayName: ["psp22mintable_external", "MintInput2"],
                type: 0,
              },
            },
          ],
          default: false,
          docs: [],
          label: "PSP22Mintable::mint",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 25,
          },
          selector: "0xfc3c75d4",
        },
        {
          args: [
            {
              label: "account",
              type: {
                displayName: ["psp22burnable_external", "BurnInput1"],
                type: 1,
              },
            },
            {
              label: "amount",
              type: {
                displayName: ["psp22burnable_external", "BurnInput2"],
                type: 0,
              },
            },
          ],
          default: false,
          docs: [],
          label: "PSP22Burnable::burn",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 25,
          },
          selector: "0x7a9da510",
        },
        {
          args: [],
          default: false,
          docs: [],
          label: "Ownable::renounce_ownership",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 29,
          },
          selector: "0x5e228753",
        },
        {
          args: [],
          default: false,
          docs: [],
          label: "Ownable::owner",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 31,
          },
          selector: "0x4fa43c8c",
        },
        {
          args: [
            {
              label: "new_owner",
              type: {
                displayName: ["ownable_external", "TransferOwnershipInput1"],
                type: 32,
              },
            },
          ],
          default: false,
          docs: [],
          label: "Ownable::transfer_ownership",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 29,
          },
          selector: "0x11f43efd",
        },
        {
          args: [],
          default: false,
          docs: [],
          label: "Pausable::paused",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 23,
          },
          selector: "0xd123ce11",
        },
        {
          args: [
            {
              label: "new_code_hash",
              type: {
                displayName: ["upgradeable_external", "SetCodeHashInput1"],
                type: 33,
              },
            },
          ],
          default: false,
          docs: [],
          label: "Upgradeable::set_code_hash",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 34,
          },
          selector: "0x1700ae80",
        },
        {
          args: [
            {
              label: "role",
              type: {
                displayName: ["accesscontrol_external", "GrantRoleInput1"],
                type: 5,
              },
            },
            {
              label: "account",
              type: {
                displayName: ["accesscontrol_external", "GrantRoleInput2"],
                type: 32,
              },
            },
          ],
          default: false,
          docs: [],
          label: "AccessControl::grant_role",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 37,
          },
          selector: "0x4ac062fd",
        },
        {
          args: [
            {
              label: "role",
              type: {
                displayName: ["accesscontrol_external", "HasRoleInput1"],
                type: 5,
              },
            },
            {
              label: "address",
              type: {
                displayName: ["accesscontrol_external", "HasRoleInput2"],
                type: 32,
              },
            },
          ],
          default: false,
          docs: [],
          label: "AccessControl::has_role",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 23,
          },
          selector: "0xc1d9ac18",
        },
        {
          args: [
            {
              label: "role",
              type: {
                displayName: ["accesscontrol_external", "RevokeRoleInput1"],
                type: 5,
              },
            },
            {
              label: "account",
              type: {
                displayName: ["accesscontrol_external", "RevokeRoleInput2"],
                type: 32,
              },
            },
          ],
          default: false,
          docs: [],
          label: "AccessControl::revoke_role",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 37,
          },
          selector: "0x6e4f0991",
        },
        {
          args: [
            {
              label: "role",
              type: {
                displayName: ["accesscontrol_external", "RenounceRoleInput1"],
                type: 5,
              },
            },
            {
              label: "account",
              type: {
                displayName: ["accesscontrol_external", "RenounceRoleInput2"],
                type: 32,
              },
            },
          ],
          default: false,
          docs: [],
          label: "AccessControl::renounce_role",
          mutates: true,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 37,
          },
          selector: "0xeaf1248a",
        },
        {
          args: [
            {
              label: "role",
              type: {
                displayName: ["accesscontrol_external", "GetRoleAdminInput1"],
                type: 5,
              },
            },
          ],
          default: false,
          docs: [],
          label: "AccessControl::get_role_admin",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 20,
          },
          selector: "0x83da3bb2",
        },
        {
          args: [
            {
              label: "role",
              type: {
                displayName: [
                  "accesscontrolenumerable_external",
                  "GetRoleMemberInput1",
                ],
                type: 5,
              },
            },
            {
              label: "index",
              type: {
                displayName: [
                  "accesscontrolenumerable_external",
                  "GetRoleMemberInput2",
                ],
                type: 5,
              },
            },
          ],
          default: false,
          docs: [],
          label: "AccessControlEnumerable::get_role_member",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 31,
          },
          selector: "0x163469e0",
        },
        {
          args: [
            {
              label: "role",
              type: {
                displayName: [
                  "accesscontrolenumerable_external",
                  "GetRoleMemberCountInput1",
                ],
                type: 5,
              },
            },
          ],
          default: false,
          docs: [],
          label: "AccessControlEnumerable::get_role_member_count",
          mutates: false,
          payable: false,
          returnType: {
            displayName: ["ink", "MessageResult"],
            type: 20,
          },
          selector: "0xf1b1a9d7",
        },
      ],
    },
    storage: {
      root: {
        layout: {
          struct: {
            fields: [
              {
                layout: {
                  struct: {
                    fields: [
                      {
                        layout: {
                          root: {
                            layout: {
                              leaf: {
                                key: "0x270a8fc3",
                                ty: 0,
                              },
                            },
                            root_key: "0x270a8fc3",
                          },
                        },
                        name: "supply",
                      },
                      {
                        layout: {
                          root: {
                            layout: {
                              leaf: {
                                key: "0xc2664826",
                                ty: 0,
                              },
                            },
                            root_key: "0xc2664826",
                          },
                        },
                        name: "balances",
                      },
                      {
                        layout: {
                          root: {
                            layout: {
                              leaf: {
                                key: "0xf8d71e22",
                                ty: 0,
                              },
                            },
                            root_key: "0xf8d71e22",
                          },
                        },
                        name: "allowances",
                      },
                    ],
                    name: "Data",
                  },
                },
                name: "psp22",
              },
              {
                layout: {
                  struct: {
                    fields: [
                      {
                        layout: {
                          root: {
                            layout: {
                              enum: {
                                dispatchKey: "0x6f713913",
                                name: "Option",
                                variants: {
                                  0: {
                                    fields: [],
                                    name: "None",
                                  },
                                  1: {
                                    fields: [
                                      {
                                        layout: {
                                          leaf: {
                                            key: "0x6f713913",
                                            ty: 1,
                                          },
                                        },
                                        name: "0",
                                      },
                                    ],
                                    name: "Some",
                                  },
                                },
                              },
                            },
                            root_key: "0x6f713913",
                          },
                        },
                        name: "owner",
                      },
                    ],
                    name: "Data",
                  },
                },
                name: "ownable",
              },
              {
                layout: {
                  struct: {
                    fields: [
                      {
                        layout: {
                          root: {
                            layout: {
                              leaf: {
                                key: "0xec3485f7",
                                ty: 4,
                              },
                            },
                            root_key: "0xec3485f7",
                          },
                        },
                        name: "paused",
                      },
                    ],
                    name: "Data",
                  },
                },
                name: "pausable",
              },
              {
                layout: {
                  struct: {
                    fields: [
                      {
                        layout: {
                          root: {
                            layout: {
                              leaf: {
                                key: "0x1f2cf4ac",
                                ty: 5,
                              },
                            },
                            root_key: "0x1f2cf4ac",
                          },
                        },
                        name: "admin_roles",
                      },
                      {
                        layout: {
                          root: {
                            layout: {
                              leaf: {
                                key: "0x8150f558",
                                ty: 6,
                              },
                            },
                            root_key: "0x8150f558",
                          },
                        },
                        name: "members",
                      },
                    ],
                    name: "Data",
                  },
                },
                name: "access",
              },
              {
                layout: {
                  struct: {
                    fields: [
                      {
                        layout: {
                          root: {
                            layout: {
                              leaf: {
                                key: "0x1eb9f2a8",
                                ty: 5,
                              },
                            },
                            root_key: "0x1eb9f2a8",
                          },
                        },
                        name: "admin_roles",
                      },
                      {
                        layout: {
                          root: {
                            layout: {
                              enum: {
                                dispatchKey: "0x869d6fc0",
                                name: "Option",
                                variants: {
                                  0: {
                                    fields: [],
                                    name: "None",
                                  },
                                  1: {
                                    fields: [
                                      {
                                        layout: {
                                          leaf: {
                                            key: "0x869d6fc0",
                                            ty: 1,
                                          },
                                        },
                                        name: "0",
                                      },
                                    ],
                                    name: "Some",
                                  },
                                },
                              },
                            },
                            root_key: "0x869d6fc0",
                          },
                        },
                        name: "role_members",
                      },
                    ],
                    name: "Data",
                  },
                },
                name: "enumerable",
              },
              {
                layout: {
                  struct: {
                    fields: [
                      {
                        layout: {
                          root: {
                            layout: {
                              enum: {
                                dispatchKey: "0x90a00b7d",
                                name: "Option",
                                variants: {
                                  0: {
                                    fields: [],
                                    name: "None",
                                  },
                                  1: {
                                    fields: [
                                      {
                                        layout: {
                                          leaf: {
                                            key: "0x90a00b7d",
                                            ty: 7,
                                          },
                                        },
                                        name: "0",
                                      },
                                    ],
                                    name: "Some",
                                  },
                                },
                              },
                            },
                            root_key: "0x90a00b7d",
                          },
                        },
                        name: "name",
                      },
                      {
                        layout: {
                          root: {
                            layout: {
                              enum: {
                                dispatchKey: "0xf8019f84",
                                name: "Option",
                                variants: {
                                  0: {
                                    fields: [],
                                    name: "None",
                                  },
                                  1: {
                                    fields: [
                                      {
                                        layout: {
                                          leaf: {
                                            key: "0xf8019f84",
                                            ty: 7,
                                          },
                                        },
                                        name: "0",
                                      },
                                    ],
                                    name: "Some",
                                  },
                                },
                              },
                            },
                            root_key: "0xf8019f84",
                          },
                        },
                        name: "symbol",
                      },
                      {
                        layout: {
                          root: {
                            layout: {
                              leaf: {
                                key: "0xd29264d8",
                                ty: 3,
                              },
                            },
                            root_key: "0xd29264d8",
                          },
                        },
                        name: "decimals",
                      },
                    ],
                    name: "Data",
                  },
                },
                name: "metadata",
              },
              {
                layout: {
                  struct: {
                    fields: [
                      {
                        layout: {
                          leaf: {
                            key: "0x00000000",
                            ty: 5,
                          },
                        },
                        name: "token_ratio",
                      },
                      {
                        layout: {
                          leaf: {
                            key: "0x00000000",
                            ty: 0,
                          },
                        },
                        name: "max_buy_amount",
                      },
                      {
                        layout: {
                          leaf: {
                            key: "0x00000000",
                            ty: 4,
                          },
                        },
                        name: "buy_token_status",
                      },
                      {
                        layout: {
                          leaf: {
                            key: "0x00000000",
                            ty: 0,
                          },
                        },
                        name: "amount_tokens_sold",
                      },
                      {
                        layout: {
                          leaf: {
                            key: "0x00000000",
                            ty: 8,
                          },
                        },
                        name: "limit_time_buy",
                      },
                      {
                        layout: {
                          leaf: {
                            key: "0x00000000",
                            ty: 8,
                          },
                        },
                        name: "end_time_buy",
                      },
                    ],
                    name: "Data",
                  },
                },
                name: "data",
              },
              {
                layout: {
                  struct: {
                    fields: [
                      {
                        layout: {
                          enum: {
                            dispatchKey: "0x00000000",
                            name: "Option",
                            variants: {
                              0: {
                                fields: [],
                                name: "None",
                              },
                              1: {
                                fields: [
                                  {
                                    layout: {
                                      leaf: {
                                        key: "0x00000000",
                                        ty: 6,
                                      },
                                    },
                                    name: "0",
                                  },
                                ],
                                name: "Some",
                              },
                            },
                          },
                        },
                        name: "_reserved",
                      },
                    ],
                    name: "Data",
                  },
                },
                name: "admin_data",
              },
            ],
            name: "BetTokenContract",
          },
        },
        root_key: "0x00000000",
      },
    },
    types: [
      {
        id: 0,
        type: {
          def: {
            primitive: "u128",
          },
        },
      },
      {
        id: 1,
        type: {
          def: {
            composite: {
              fields: [
                {
                  type: 2,
                  typeName: "[u8; 32]",
                },
              ],
            },
          },
          path: ["ink_primitives", "types", "AccountId"],
        },
      },
      {
        id: 2,
        type: {
          def: {
            array: {
              len: 32,
              type: 3,
            },
          },
        },
      },
      {
        id: 3,
        type: {
          def: {
            primitive: "u8",
          },
        },
      },
      {
        id: 4,
        type: {
          def: {
            primitive: "bool",
          },
        },
      },
      {
        id: 5,
        type: {
          def: {
            primitive: "u32",
          },
        },
      },
      {
        id: 6,
        type: {
          def: {
            tuple: [],
          },
        },
      },
      {
        id: 7,
        type: {
          def: {
            primitive: "str",
          },
        },
      },
      {
        id: 8,
        type: {
          def: {
            primitive: "u64",
          },
        },
      },
      {
        id: 9,
        type: {
          def: {
            variant: {
              variants: [
                {
                  index: 0,
                  name: "None",
                },
                {
                  fields: [
                    {
                      type: 7,
                    },
                  ],
                  index: 1,
                  name: "Some",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 7,
            },
          ],
          path: ["Option"],
        },
      },
      {
        id: 10,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 6,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 11,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 6,
            },
            {
              name: "E",
              type: 11,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 11,
        type: {
          def: {
            variant: {
              variants: [
                {
                  index: 1,
                  name: "CouldNotReadInput",
                },
              ],
            },
          },
          path: ["ink_primitives", "LangError"],
        },
      },
      {
        id: 12,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 13,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 11,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 13,
            },
            {
              name: "E",
              type: 11,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 13,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 6,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 14,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 6,
            },
            {
              name: "E",
              type: 14,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 14,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 7,
                      typeName: "String",
                    },
                  ],
                  index: 0,
                  name: "Custom",
                },
                {
                  index: 1,
                  name: "OnlyOwner",
                },
                {
                  index: 2,
                  name: "OnlyAdmin",
                },
                {
                  index: 3,
                  name: "InvalidCaller",
                },
                {
                  index: 4,
                  name: "OnlyMinterCanMint",
                },
                {
                  index: 5,
                  name: "NotApproved",
                },
                {
                  index: 6,
                  name: "CannotTransfer",
                },
                {
                  index: 7,
                  name: "CannotMint",
                },
                {
                  index: 8,
                  name: "InvalidBuyTokensStatus",
                },
                {
                  index: 9,
                  name: "InsufficientAllowanceToLend",
                },
                {
                  index: 10,
                  name: "NotEnoughBalance",
                },
                {
                  index: 11,
                  name: "WithdrawFeeError",
                },
                {
                  index: 12,
                  name: "MaxBuyTokenAmount",
                },
                {
                  index: 13,
                  name: "TokensCanNotPurchased",
                },
                {
                  index: 14,
                  name: "TransferFailed",
                },
                {
                  index: 15,
                  name: "AlreadyInit",
                },
                {
                  index: 16,
                  name: "NotOwner",
                },
                {
                  index: 17,
                  name: "BetNotFinalized",
                },
                {
                  index: 18,
                  name: "CallerIsNotAdmin",
                },
                {
                  index: 19,
                  name: "InvalidInput",
                },
                {
                  index: 20,
                  name: "BetNotExist",
                },
                {
                  index: 21,
                  name: "HoldAmountPlayerNotExist",
                },
                {
                  index: 22,
                  name: "NoAmount",
                },
                {
                  index: 23,
                  name: "InvalidBalanceAndAllowance",
                },
                {
                  index: 24,
                  name: "InvalidUnstakedAmount",
                },
                {
                  index: 25,
                  name: "NotTimeToUnstaked",
                },
                {
                  index: 26,
                  name: "NoStakerFound",
                },
                {
                  index: 27,
                  name: "NotStaked",
                },
                {
                  index: 28,
                  name: "InvalidTotalStake",
                },
                {
                  index: 29,
                  name: "CallerNotRequestUnstake",
                },
                {
                  index: 30,
                  name: "ClaimMustBeFalse",
                },
                {
                  index: 31,
                  name: "RewardStarted",
                },
                {
                  index: 32,
                  name: "RewardNotStarted",
                },
                {
                  index: 33,
                  name: "InvalidInputRatio",
                },
                {
                  index: 34,
                  name: "NotTimeBuyToken",
                },
                {
                  index: 35,
                  name: "CannotBuyAtThisTime",
                },
                {
                  index: 36,
                  name: "NotTimeToFinalize",
                },
                {
                  fields: [
                    {
                      type: 15,
                      typeName: "OwnableError",
                    },
                  ],
                  index: 37,
                  name: "OwnableError",
                },
                {
                  fields: [
                    {
                      type: 16,
                      typeName: "AccessControlError",
                    },
                  ],
                  index: 38,
                  name: "AccessControlError",
                },
                {
                  fields: [
                    {
                      type: 17,
                      typeName: "PSP22Error",
                    },
                  ],
                  index: 39,
                  name: "PSP22Error",
                },
                {
                  fields: [
                    {
                      type: 19,
                      typeName: "PausableError",
                    },
                  ],
                  index: 40,
                  name: "PausableError",
                },
                {
                  index: 41,
                  name: "CheckedOperations",
                },
              ],
            },
          },
          path: ["bet_a0", "traits", "error", "Error"],
        },
      },
      {
        id: 15,
        type: {
          def: {
            variant: {
              variants: [
                {
                  index: 0,
                  name: "CallerIsNotOwner",
                },
                {
                  index: 1,
                  name: "NewOwnerIsNotSet",
                },
              ],
            },
          },
          path: [
            "openbrush_contracts",
            "traits",
            "errors",
            "ownable",
            "OwnableError",
          ],
        },
      },
      {
        id: 16,
        type: {
          def: {
            variant: {
              variants: [
                {
                  index: 0,
                  name: "InvalidCaller",
                },
                {
                  index: 1,
                  name: "MissingRole",
                },
                {
                  index: 2,
                  name: "RoleRedundant",
                },
              ],
            },
          },
          path: [
            "openbrush_contracts",
            "traits",
            "errors",
            "access_control",
            "AccessControlError",
          ],
        },
      },
      {
        id: 17,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 7,
                      typeName: "String",
                    },
                  ],
                  index: 0,
                  name: "Custom",
                },
                {
                  index: 1,
                  name: "InsufficientBalance",
                },
                {
                  index: 2,
                  name: "InsufficientAllowance",
                },
                {
                  index: 3,
                  name: "RecipientIsNotSet",
                },
                {
                  index: 4,
                  name: "SenderIsNotSet",
                },
                {
                  fields: [
                    {
                      type: 7,
                      typeName: "String",
                    },
                  ],
                  index: 5,
                  name: "SafeTransferCheckFailed",
                },
                {
                  index: 6,
                  name: "PermitInvalidSignature",
                },
                {
                  index: 7,
                  name: "PermitExpired",
                },
                {
                  fields: [
                    {
                      type: 18,
                      typeName: "NoncesError",
                    },
                  ],
                  index: 8,
                  name: "NoncesError",
                },
              ],
            },
          },
          path: [
            "openbrush_contracts",
            "traits",
            "errors",
            "psp22",
            "PSP22Error",
          ],
        },
      },
      {
        id: 18,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 1,
                      typeName: "AccountId",
                    },
                    {
                      type: 8,
                      typeName: "u64",
                    },
                  ],
                  index: 0,
                  name: "InvalidAccountNonce",
                },
                {
                  index: 1,
                  name: "NonceOverflow",
                },
              ],
            },
          },
          path: [
            "openbrush_contracts",
            "traits",
            "errors",
            "nonces",
            "NoncesError",
          ],
        },
      },
      {
        id: 19,
        type: {
          def: {
            variant: {
              variants: [
                {
                  index: 0,
                  name: "Paused",
                },
                {
                  index: 1,
                  name: "NotPaused",
                },
              ],
            },
          },
          path: [
            "openbrush_contracts",
            "traits",
            "errors",
            "pausable",
            "PausableError",
          ],
        },
      },
      {
        id: 20,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 5,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 11,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 5,
            },
            {
              name: "E",
              type: 11,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 21,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 8,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 11,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 8,
            },
            {
              name: "E",
              type: 11,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 22,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 0,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 11,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 0,
            },
            {
              name: "E",
              type: 11,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 23,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 4,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 11,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 4,
            },
            {
              name: "E",
              type: 11,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 24,
        type: {
          def: {
            sequence: {
              type: 3,
            },
          },
        },
      },
      {
        id: 25,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 26,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 11,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 26,
            },
            {
              name: "E",
              type: 11,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 26,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 6,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 17,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 6,
            },
            {
              name: "E",
              type: 17,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 27,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 3,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 11,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 3,
            },
            {
              name: "E",
              type: 11,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 28,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 9,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 11,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 9,
            },
            {
              name: "E",
              type: 11,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 29,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 30,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 11,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 30,
            },
            {
              name: "E",
              type: 11,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 30,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 6,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 15,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 6,
            },
            {
              name: "E",
              type: 15,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 31,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 32,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 11,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 32,
            },
            {
              name: "E",
              type: 11,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 32,
        type: {
          def: {
            variant: {
              variants: [
                {
                  index: 0,
                  name: "None",
                },
                {
                  fields: [
                    {
                      type: 1,
                    },
                  ],
                  index: 1,
                  name: "Some",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 1,
            },
          ],
          path: ["Option"],
        },
      },
      {
        id: 33,
        type: {
          def: {
            composite: {
              fields: [
                {
                  type: 2,
                  typeName: "[u8; 32]",
                },
              ],
            },
          },
          path: ["ink_primitives", "types", "Hash"],
        },
      },
      {
        id: 34,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 35,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 11,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 35,
            },
            {
              name: "E",
              type: 11,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 35,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 6,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 36,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 6,
            },
            {
              name: "E",
              type: 36,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 36,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 7,
                      typeName: "String",
                    },
                  ],
                  index: 0,
                  name: "Custom",
                },
                {
                  index: 1,
                  name: "SetCodeHashFailed",
                },
                {
                  fields: [
                    {
                      type: 15,
                      typeName: "OwnableError",
                    },
                  ],
                  index: 2,
                  name: "OwnableError",
                },
                {
                  fields: [
                    {
                      type: 16,
                      typeName: "AccessControlError",
                    },
                  ],
                  index: 3,
                  name: "AccessControlError",
                },
              ],
            },
          },
          path: [
            "openbrush_contracts",
            "traits",
            "errors",
            "upgradeable",
            "UpgradeableError",
          ],
        },
      },
      {
        id: 37,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 38,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 11,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 38,
            },
            {
              name: "E",
              type: 11,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 38,
        type: {
          def: {
            variant: {
              variants: [
                {
                  fields: [
                    {
                      type: 6,
                    },
                  ],
                  index: 0,
                  name: "Ok",
                },
                {
                  fields: [
                    {
                      type: 16,
                    },
                  ],
                  index: 1,
                  name: "Err",
                },
              ],
            },
          },
          params: [
            {
              name: "T",
              type: 6,
            },
            {
              name: "E",
              type: 16,
            },
          ],
          path: ["Result"],
        },
      },
      {
        id: 39,
        type: {
          def: {
            variant: {},
          },
          path: ["ink_env", "types", "NoChainExtension"],
        },
      },
    ],
    version: "4",
  },
};

export default betaz_token_contract;
