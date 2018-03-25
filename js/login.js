/**
 * Created by F on 2018/3/20.
 */
//全局变量
var memberArr = store.get("member") || [{email: "admin", pw: "admin", detailText: "", time: "", is_vip: true, is_online: false}];
var memberOnlineIndex;
(function () {
    $(function (){

        //检测是否有会员在线
        $.each(memberArr, function (i) {
            if(this.is_online){
                memberOnlineIndex = i;
                $('#member-login').css('display','none');
                $('#member-login-out,#member-login-after').css('display','block');
            }
        });

        //实现切换会员账号
        $('#member-login-out').click(function () {
            memberArr[memberOnlineIndex].is_online = false;
            store.set("member",memberArr);
            $('#member-login').css('display','block');
            $('#member-login-out,#member-login-after').css('display','none');
        });

        //登录界面的显示和隐藏
        $('#member-login').click(function () {
            $(".mask").css("display","block");
            $(".login").css("display","block");
        })
        $(".register_member").click(function(){
            $(".login").css("display","none");
            $(".registered").css("display","block");
        })

        $(".login_member").click(function(){
            $(".registered").css("display","none");
            $(".login").css("display","block");
        })

        $(".close").click(function(){
            $(".mask").css("display","none");
            $(".registered").css("display","none");
        });



        //获取相关元素
        var regisEmail = $('#register_email'),
            regisPw = $('#register_pw'),
            s_Pw = $('#s_pw'),
            r_prompt = $('.registered .prompt');
        //创建验证邮箱的正则
        var emailPat = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        //密码正则
        var pwPat = /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/;

        //注册页面点击输入框 label文本消失
        //增加输入框的边框
        regisEmail.focus(showBorder).blur(hideBorder);
        regisPw .focus(showBorder).blur(hideBorder);
        s_Pw.focus(showBorder).blur(hideBorder);


        //注册会员
        $('#register').on('click', function () {
            var outflag = true;
            if(regisEmail.val().match(emailPat)){
                $.each(memberArr,function () {
                    var flag = this.email == regisEmail.val();
                    if(flag){
                       r_prompt.text('该会员名已存在');
                        outflag = false;
                        return false;
                   }
                });
                if(outflag){
                    //密码要大于八位 并且不能只是数字或者字母
                    //验证密码是否符合规范 并查看两个密码是否相等
                    if(regisPw.val().match(pwPat) && regisPw.val() ===s_Pw.val()){
                        var date = new Date();
                        var obj = {
                            email :regisEmail.val(),
                            pw : regisPw.val(),
                            detailText : "",
                            time : date,
                            is_vip : false,
                            is_online : false
                        };
                        //更新本地库
                        memberArr.push(obj);
                        store.set("member",memberArr);
                        $(".registered").css("display","none");
                        $(".login").css("display","block");
                        return false;
                    }else {
                        r_prompt.text('输入的密码有误');
                    }
                }
            }else {
                r_prompt.text('输入的邮箱有误')
            }
        });


        //登录功能
        var email = $('#email'),
            pw = $('#pw');

        email.focus(showBorder).blur(hideBorder);
        pw.focus(showBorder).blur(hideBorder);
        $('#sent').click(function () {
            if(email.val().match(emailPat)) {
                memberArr.forEach(function (item,i) {
                    if (item.email == email.val()) {
                        if (pw.val().match(pwPat) && pw.val() === item.pw) {
                            $('#member-login').css('display','none');
                            $('#member-login-out,#member-login-after').css('display','block');
                            //更新本地的账号在线状态
                            memberArr[i].is_online=true;
                            store.set("member",memberArr);
                            $(".mask").css("display","none");
                        }
                    }
                })
            }
        });





    //共用函数
        //显示和隐藏边框和label文字
        function showBorder() {
            $(this).siblings('label').css('display','none');
            $(this).css('border','2px solid skyblue')
        };
        function hideBorder() {
            if($(this).val() == ""){
                $(this).siblings('label').css('display','block');
            }
            $(this).css('border','1px solid #aaa');
        }
    })
})()