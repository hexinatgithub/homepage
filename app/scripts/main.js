function compileHTML(source, des, content) {
	var sourceHTML = $(source).html();
	var template = Handlebars.compile(sourceHTML);
	var html = template(content);
	$(des).html(html);
}

function color(point) {
	function between(number, min, max) {
		return (min <= number && number < max);
	}
	var out = 'progress-bar-',
		c = '';
	if (between(point, 90, 100)) {
		c = 'danger';
	} else if (between(point, 80, 90)) {
		c = 'warning';
	} else if (between(point, 65, 80)) {
		c = 'success';
	} else {
		c = 'info';
	}
	return out + c;
}

// skills
var skills = [{
	skillName: 'javaScript',
	skillPoint: 80,
	description: [
		'熟练掌握原生javaScript，DOM模型，可以不依赖库进行开发',
		'能够进行模块化开发，熟练使用MVVM,MVC框架等',
		'熟练使用angularJS，handlebarsJS，jQuery等库进行开发',
		'掌握函数式编程，面向对象编程'
	]
}, {
	skillName: 'HTML&CSS',
	skillPoint: 90,
	description: [
		'了解HTML 5新标签的语义',
		'能适当运用CSS 3使页面在现代浏览器上效果更佳',
		'能熟练使用Chrome开发者工具、FireBug、Fiddler等工具辅助开发',
		'熟练使用Bootstrap进行响应式开发'
	]
}, {
	skillName: 'iOS&Swift',
	skillPoint: 80,
	description: [
		'掌握并理解iOS的MVC模型，能够熟练使用swift进行iOS开发',
		'对swift语言非常喜爱，基于类型推导可以写出脚本语言一样的程序'
	]
}, {
	skillName: 'Python',
	skillPoint: 70,
	description: [
		'熟练使用python开发，熟练python的函数式编程和面向对象编程',
		'进行脚本开发，使工作自动化'
	]
}, {
	skillName: 'Node.js',
	skillPoint: 70,
	description: [
		'熟悉基于Express框架的Web开发',
		'能根据前端业务需求开发对应的辅助工具'
	]
}, {
	skillName: '英语',
	skillPoint: 85,
	description: [
		'大学期间获得CET4证书',
		'可以阅读原版的英文书籍，看懂官网的API文档，查阅英文质料'
	]
}].sort(function(a, b) {
	return a.skillPoint < b.skillPoint;
});

//workExperience
var workExperience = {
	experience: [{
		company: '深圳趣凡网络科技有限公司',
		workContent: 'coco2dx跨平台斗地主开发',
		job: [
			'用c++进行cocos2dx的斗地主的开发',
			'利用cocos2dx进行各种手机的屏幕适配',
			'进行了模块化设计的重构，使各部分主件的功能可以复用，使客户端的代码更加稳定和更有效率',
			'和UI美术进行协同开发，使得产品和设计一致',
			'使用了粒子效果开发工具和字体开发工具，自定义了游戏效果'
		],
		reasonForLeave: '后因业务趋于稳定，开发方面主要进行一些功能升级，觉得发展受到了瓶颈，故离职'
	}, {
		company: '广州奔步广告设计有限公司',
		workContent: '进行外包网站开发',
		job: [
			'使用javaScript进行一个图片评论网站的开发',
			'学习nodejs和mongoDB进行了部分的后台开发',
			'对上传的图片和评论存储到mongoDB服务器，并且根据观看次数和评论数进行图片的排名，显示在主页上面',
			'对面express框架有了一定的理解',
			'学习swift进行了iOS端的部分开发工作',
			'在期间熟悉使用angularJS并理解了MVVM和MVC框架'
		],
		reasonForLeave: '外包开发工作量大，且不需要进行特别的维护，对代码的质量要求不高，想找个前端有挑战的工作'
	}]
};

Handlebars.registerHelper('skilllist', function(items, options) {
	var out = '<ul ' + Object.keys(options.hash).map(function(key) {
		return key + '="' + options.hash[key] + '"';
	}).join(" ") + '>\n';
	var data;
	if (options.data) {
		data = Handlebars.createFrame(options.data);
	}
	for (var index = 0; index < items.length; index++) {
		var element = items[index];
		if (data) {
			data.index = index;
		}
		element.color = color(element.skillPoint);
		out = out + '<li>' + options.fn(element, {
			data: data
		}) + '</li>\n';
	}
	return out + '</ul>';
});

Handlebars.registerHelper('descriptionList', function(items, options) {
	var out = '<ul style="list-style-type: disc">\n';
	out = out + items.map(function(element) {
		return '<li>' + element + '</li>';
	}).join('\n');
	return out + "</ul>\n";
});

Handlebars.registerHelper('workExperienceList', function(items, options) {
	var out = '<ul ' + Object.keys(options.hash).map(function(key) {
		return key + '="' + options.hash[key] + '"';
	}).join(' ') + '>\n';
	var data;
	if (options.data) {
		data = Handlebars.createFrame(options.data);
	}
	out = out + items.map(function(item, index) {
		if (data) {
			data.index = index;
		}
		return '<li style="margin: 20px;">' + options.fn(item, {
			data: data
		}) + '</li>\n';
	}).join('');
	return out + '</ul>';
});

Handlebars.registerHelper('modalList', function(items, options) {
	var out, data;
	if (options.data) {
		data = Handlebars.createFrame(options.data);
	}
	out = out + items.map(function(item, index) {
		if (data) {
			data.index = index;
		}
		return options.fn(item, {
			data: data
		});
	});
	return out;
});

Handlebars.registerHelper('list', function(items, options) {
	var out = '<ul>\n';
	out = out + items.map(function(item, index) {
		return '<li>' + options.fn(item) + '</li>\n';
	}).join('');
	return out + '</ul>\n';
});

function progressAttacheEvent() {
	$('.progress-bar').on('skillPageLoad', function(event) {
		var att = $(this).attr('aria-valuenow');
		var value = parseInt(att);
		$(this).css('width', value + '%');
	});
}

function progressSkillAttacheEvent() {
	function hide(bool) {
		var index = $(this).attr('index');
		var skillDescriptionID = '#' + index + '-description';
		var h = bool ? "hidden" : "visible";
		$(skillDescriptionID).css('visibility', h);
	}
	$('.progress-skill').hover(function(event) {
		hide.call(this, false);
	}, function(event) {
		hide.call(this, true);
	});
}

$(document).ready(function() {
	$('#fullpage').fullpage({
		afterLoad: function(anchorLink, index) {
			switch (index) {
				case 1:
					break;
				case 2:
					var event = jQuery.Event('skillPageLoad');
					jQuery('.progress-bar').trigger(event);
					break;
			}
		},
		sectionsColor: ['rgb(27, 188, 155)', 'rgb(75, 191, 195)', 'rgb(123, 170, 190)', 'rgb(110, 150, 200)']
	});

	compileHTML('#skills-content', '#skills', {
		skills: skills
	});

	compileHTML('#workExperience-content', '#workExperience', workExperience);
	compileHTML('#modal-list-content', '#modal-list', workExperience);

	progressSkillAttacheEvent();
	progressAttacheEvent();
});