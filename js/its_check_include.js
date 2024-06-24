function trim(string)
{
	return string.replace(/(^\s+)|(\s+$)/g, "");
}

function isRegNumValid(regnum)
{
   regnum = trim(regnum);
	
   if (regnum.length > 12)	return false;
	
   var validChars = "0123456789.";
   var isNumber=true;
   var ch;
   var numbersCount = 0;
   
   for (i = 0; i < regnum.length && isNumber == true; i++) 
   { 
      ch = regnum.charAt(i); 
      if (validChars.indexOf(ch) == -1) 
         isNumber = false;
      else
    	 numbersCount++;
   }

   if (!isNumber || numbersCount==0)
	   return false;
   
   return true;  
}



function doCheck() {
	var rn = document.check.rn.value;

	if (!isRegNumValid(rn))
	{
		alert("Неверный регистрационный номер");
		return;
	}
	
	var btn = document.getElementById("check-btn");
	if (btn) {
		btn.disabled = true;
		btn.innerHTML = '<img src="https://1c.ru/images/ajax-loader.gif" width="16" height="16" alt="Пожалуйста, подождите" />';
	}

	$.getScript("https://1c.ru/rus/support/its/js-check-subscribe.jsp?rn=" + escape(rn), function() {startResult();});
}

function ajaxCheck(rn, result, result2) {
	var message;

	message = '';
	
	if (result2 == "NEED") 
	{
		if (result == "OK") 
			message += "<span style='color: green;'>Есть действующий договор 1C:ИТС</span>";
		else
		{ 
			message += "<span style='color:green'>Для сопровождения обязателен договор 1C:ИТС</span>";
			message += "<br><br>По данному регистрационному номеру договор 1С:ИТС <span style='color: red;'>НЕ зарегистрирован</span>.<br/><br/>Обратите внимание!  Несанкционированное распространение и использование обновлений программ 1С:Предприятие является нарушением авторского права фирмы &quot;1С&quot;.<br/><br/>Подробнее об условиях поддержки и распространения обновлений программ 1С:Предприятие см. <a href='http://www.1c.ru/rus/support/support.htm'>здесь</a>.<br/><br/>По вопросам, связанным с оформлением договора на ИТС, обращайтесь <a href='mailto:its@1c.ru'>its@1c.ru</a>"
				+ "<br/><br/>Для получения качественного информационно-технологического сопровождения, "+
				"сервисных и консалтинговых услуг фирма «1С» рекомендует обращаться к <a href='http://its.1c.ru/partners'>Сервис-центрам и сервис-партнерам ИТС</a>";
		}
	}
	else
	{ 
		if (result == "OK") 
			message += "<span style='color: green;'>Есть действующий договор 1С:ИТС</span>";
		else
		{ 
			message += "<span style='color:green'>Допускается сопровождение без договора 1C:ИТС.</span>";
			message += "<br><br>По данному регистрационному номеру договор 1С:ИТС <span style='color:red'>НЕ зарегистрирован</span>." +
				"<br><br>Для получения качественного информационно-технологического сопровождения, "+
				"сервисных и консалтинговых услуг фирма «1С» рекомендует обращаться к <a href='http://its.1c.ru/partners'>Сервис-центрам и сервис-партнерам ИТС</a>";
		}
	}



	
	var d = document.getElementById("check-mess");
	if (d) d.innerHTML = message;
	var btn = document.getElementById("check-btn");
	if (btn) {
		btn.disabled = false;
		btn.innerHTML = "&nbsp;&rarr;&nbsp;";
	}
}

document.write('<div class="its_checker">');
document.write('	<h3 class="checker_title">Проверка наличия договора 1C:ИТС</h3>');
document.write('	<form name="check" onsubmit="return false;">');
document.write('		<p>Введите регистрационный номер Вашего программного продукта:</p>');
document.write('		<p>');
document.write('			<input type="text" name="rn" size="15" maxlength="15" />');
document.write('			<button id="check-btn" type="button" onclick="doCheck()">&nbsp;&rarr;&nbsp;</button>');
document.write('		</p>');
document.write('		<div id="check-mess"></div>');
document.write('	</form>');
document.write('	</div>');
