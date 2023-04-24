from pyteal import *
import program

def approval():
    #variables
    local_structure_cotton=Bytes("structurecotton")
    local_structure_elasticity=Bytes("structureelasticity") 
    local_origin_of_supplyer=Bytes("originofsupplyer") #supplyer
    local_quantity=Bytes("quantity")
    local_wager=Bytes("wager")
    local_control_agency=Bytes("controlagency") #control agency
    local_partner=Bytes("partner")

    #operations
    op_start=Bytes("start")
    op_accept=Bytes("accept")
    op_resolve=Bytes("resolve")



    @Subroutine(TealType.none)
    def get_ready(account: Expr):
        return Seq(
            App.localPut(account,local_structure_cotton,Bytes("")),
            App.localPut(account,local_structure_elasticity,Bytes("")),
            App.localPut(account,local_origin_of_supplyer,Bytes("")),
            App.localPut(account,local_quantity,Bytes("")),
            App.localPut(account,local_wager,Int(0)),
            App.localPut(account,local_control_agency,Bytes("")),
            App.localPut(account,local_partner,Bytes(""))


        )
    
    @Subroutine(TealType.uint64)
    def check_if_empty_company(account:Expr):
        return Return(
            And(
            
                App.localGet(account,local_structure_cotton)==Bytes(""),
                App.localGet(account,local_structure_elasticity)==Bytes(""),
                App.localGet(account,local_quantity)==Bytes(""),
                App.localGet(account,local_wager)==Int(0),
                App.localGet(account,local_partner)==Bytes("")
               
                
            )
        )
    
    @Subroutine(TealType.uint64)
    def check_if_empty_manufacturer(account:Expr):
        return Return(
            And(
                App.localGet(account,local_structure_cotton)==Bytes(""),
                App.localGet(account,local_structure_elasticity)==Bytes(""),
                App.localGet(account,local_origin_of_supplyer)==Bytes(""),
                App.localGet(account,local_quantity)==Bytes(""),
                App.localGet(account,local_control_agency)==Bytes(""),
                App.localGet(account,local_partner)==Bytes("")
                
            )
        )
    
    perform_checks=Assert(
        And(
            Global.group_size()==Int(2),
            Txn.group_index()==Int(0),
            Gtxn[1].type_enum()==TxnType.Payment,
            Gtxn[1].receiver()==Global.current_application_address(), #save money in application until conditions in resolve are not fullfilled
            Gtxn[0].rekey_to()==Global.zero_address(),
            Gtxn[1].rekey_to()==Global.zero_address(),
            App.optedIn(Txn.accounts[1],Global.current_application_id())



        )
    )
    
    @Subroutine(TealType.none)
    def start_contract():
        return Seq(
            perform_checks,
            Assert(
                And(
                    
                    check_if_empty_company(Txn.sender()),
                    check_if_empty_manufacturer(Txn.accounts[1]),
            
                )
             ),
            App.localPut(Txn.sender(),local_partner,Txn.accounts[1]),
            App.localPut(Txn.sender(),local_structure_cotton,Txn.application_args[1]),
            App.localPut(Txn.sender(),local_structure_elasticity,Txn.application_args[2]),
            App.localPut(Txn.sender(),local_quantity,Txn.application_args[3]),
            App.localPut(Txn.sender(),local_wager,Gtxn[1].amount()),
            Approve()
   
        )
    
    @Subroutine(TealType.none)
    def accept_contract():
        return Seq(
             Assert(
                And(
                    
                    
                      check_if_empty_manufacturer(Txn.sender()),
                    
            
                 )
             ),
            App.localPut(Txn.sender(),local_partner,Txn.accounts[1]),
            App.localPut(Txn.sender(),local_structure_cotton,Txn.application_args[1]),
            App.localPut(Txn.sender(),local_structure_elasticity,Txn.application_args[2]),
            App.localPut(Txn.sender(),local_quantity,Txn.application_args[3]),
            App.localPut(Txn.sender(),local_origin_of_supplyer,Txn.application_args[4]),
            App.localPut(Txn.sender(),local_control_agency,Txn.application_args[5]),
            Approve()
   
        )
    
    @Subroutine(TealType.none)
    def transfer_wager(acc_index:Expr, wager:Expr):
        return Seq(
             InnerTxnBuilder.Begin(),

             InnerTxnBuilder.SetFields({
                 TxnField.type_enum:TxnType.Payment,
                 TxnField.receiver:Txn.accounts[acc_index],
                 TxnField.amount:wager
             }),
             InnerTxnBuilder.Submit()
        )


    @Subroutine(TealType.none)
    def check_conditions(cotton_a: Expr,cotton_b: Expr, elasticity_a: Expr,elasticity_b: Expr,quantity_a: Expr,quantity_b: Expr, wager: Expr):

        return Seq(
           If(
                And(
                    cotton_a <= cotton_b,
                    elasticity_a <= elasticity_b,
                    quantity_a <= quantity_b

                )
           )
           .Then(
                transfer_wager(Int(1),wager)

           )
           .Else(
            transfer_wager(Int(0),wager)
           )

        )




    @Subroutine(TealType.none)
    def resolve_contract():
        cotton_a= ScratchVar(TealType.uint64)
        cotton_b= ScratchVar(TealType.uint64)
        elasticity_a= ScratchVar(TealType.uint64)
        elasticity_b= ScratchVar(TealType.uint64)
        quantity_a= ScratchVar(TealType.uint64)
        quantity_b= ScratchVar(TealType.uint64)
        wager= ScratchVar(TealType.uint64)

        return Seq(
             Assert(
                 And(
                     Global.group_size()==Int(1),
                     Txn.group_index()==Int(0),
                    
                     Gtxn[0].rekey_to()==Global.zero_address(),

                     Txn.application_args.length()==Int(1)

                    
                 )
             ),
             cotton_a.store(Btoi(App.localGet(Txn.accounts[0],local_structure_cotton))),
             cotton_b.store(Btoi(App.localGet(Txn.accounts[1],local_structure_cotton))),
             elasticity_a.store(Btoi(App.localGet(Txn.accounts[0],local_structure_elasticity))),
             elasticity_b.store(Btoi(App.localGet(Txn.accounts[1],local_structure_elasticity))),
             quantity_a.store(Btoi(App.localGet(Txn.accounts[0],local_quantity))),
             quantity_b.store(Btoi(App.localGet(Txn.accounts[1],local_quantity))),
             wager.store(App.localGet(Txn.accounts[0],local_wager)),

             check_conditions(cotton_a.load(),cotton_b.load(),elasticity_a.load(),elasticity_b.load(),quantity_a.load(),quantity_b.load(),wager.load()),

             Approve()

        )

    return program.event(
        init=Approve(),
        opt_in=Seq(
        get_ready(Txn.sender()),
        Approve()
        ),
        no_op=Seq(
            Cond(
                [Txn.application_args[0]==op_start,start_contract()],
                [Txn.application_args[0]==op_accept,accept_contract()],
                [Txn.application_args[0]==op_resolve,resolve_contract()]
            ),
            Reject()
        )
    )



def clear():
    return Approve()