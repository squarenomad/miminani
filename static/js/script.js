Vue.component('panel-navbar', {
	template: '#panel-navbar',
	props: {
		current_panel: {
			type: String,
			required: true
		},
		button_menus: {
			type: Array,
			required: true
		},
		dropdown_menu: {
			type: Array,
			required: true
		},
		current_panel_view: {
			type: String,
			required: true
		}
	},
	data: function() {
		return {
			open_panel_menu: false
		}
	},
	methods: {
		togglePanelMenu: function() {
			this.open_panel_menu = !this.open_panel_menu
		},
		panelSelected: function(panel) {
			this.open_panel_menu = false
			bus.$emit('panel-selected', panel)
		},
		panelViewSelected: function(panel_view) {
			this.open_panel_menu = false
			bus.$emit('panel-view-selected', panel_view)
		}
	}
})

Vue.component('app-navbar', {
	template: '#app-navbar',
	props: {
		nav_state: {
			type: Object,
			required: true
		},
		open_submenu: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		nav_menus: {
			type: Array,
			required: true
		},

	},
	methods: {
		maindropdown: function() {
			this.$emit('maindropdown')
		},
		subdropdown: function(menu) {
			this.$emit('subdropdown', menu)
		}
	}
})

Vue.component('app-sidebar', {
	template: "#app-sidebar",
	props: {
		current_panel: {
			type: String,
			required: true
		},
		panels: {
			type: Array,
			required: true
		}
	},
	methods: {
		panelSelected: function(panel) {
			bus.$emit('panel-selected', panel)
		}
	}
})

Vue.component('form-pane', {
	template: '#form-pane',
	props: {
		form : {
			type: Object,
			required: true
		}
	},
	methods: {
		validateAll: function() {
			this.$validator.validateAll().then(function(result) {
				alert('Form Submitted')
			}).catch(function(failure) {
				alert('Please correct form details')
			})
		}
	}
})

Vue.use(VeeValidate);

var bus = new Vue()

var vm = new Vue({
	el: '#app',
	data: {
		current_view: 'Relationships',
		current_panel_view: 'Add Relationships',
		open_main_dropdown: false,
		open_sub_dropdown_name: '',
		panels: [
			{
				name: 'Relationships',
				menus: [
					{
						name: 'List Relationships',
						reference: 'List all your relationships',
						icon: 'fa fa-users fa-lg',
						class: 'btn btn-lg btn-primary btn-block',
						length: 'col-md-4 col-sm-4 col-xs-4'
					},
					{
						name: 'Add Relationships',
						reference: 'Add a relationship',
						icon: 'fa fa-user-plus fa-lg',
						class: 'btn btn-lg btn-info btn-block',
						length: 'col-md-4 col-sm-4 col-xs-4'
					},
					{
						name: 'Edit Relationships',
						reference: 'Edit a relationship',
						icon: 'fa fa-pencil-square fa-lg',
						class: 'btn btn-lg btn-warning btn-block',
						length: 'col-md-4 col-sm-4 col-xs-4'
					}
				],
				views: [
					{
						type: 'Form',
						name: 'Add Relationships',
						inputs: [
							{ placeholder: 'JohnOlooDoe@gmail.com', validate: "email" , name: 'Email', type: 'email'},
							{ placeholder: 'John', validate: "required|alpha" , name: 'First Name', type: 'alpha'},
							{ placeholder: 'Oloo', validate: "required|alpha" , name: 'Ethnic Name', type: 'alpha'},
							{ placeholder: 'Doe', validate: "required|alpha" , name: 'Last Name', type: 'alpha'}
						],
						submit: 'Add'
					}
				]
			},{
				name: 'Overview',
				menus: [],
				views: []
			},{
				name: 'Visualisation',
				menus: [],
				views: []
			},{
				name: 'Share',
				menus: [],
				views: []
			}
		],
		title: 'MIMINANI',
		nav_menus: [
			{
				caption: 'Info',
				icon: 'fa fa-info-circle fa-lg',
				link: '#',
				class: '',
				dropdown: [],
				reference: 'Read more about the miminani project'
			},
			{
				caption: 'Github',
				icon: 'fa fa-github fa-lg',
				link: 'http://github.com/squarenomad/miminani',
				class: '',
				dropdown: [],
				reference: 'View our open source code'
			},
			{
				caption: 'Messages',
				icon: 'fa fa-inbox fa-lg',
				link: '#',
				class: '',
				dropdown: [],
				reference: 'Notifications and alerts'
			},
			{
				caption: 'User',
				icon: 'fa fa-user-circle fa-lg',
				link: '#',
				class: 'dropdown active',
				dropdown: [
					{
						caption:'Profile',
						link: '#',
						class: 'disabled'
					},
					{
						caption:'Settings',
						link: '#',
						class: 'disabled'
					},
					{
						caption:'Sign Out',
						link: '#',
						class: ''
					}
				],
				reference: 'Manage your profile'
			}
		]
	},
	methods: {
		toggleMenu: function() {
			this.open_main_dropdown = !this.open_main_dropdown
			this.open_sub_dropdown_name = ''
		},
		toggleSubMenu: function(menu_name) {
			if (this.open_sub_dropdown_name == menu_name) {
				this.open_sub_dropdown_name = ''
			} else {
				this.open_sub_dropdown_name = menu_name
			}
		},
		navigateAllowed: function(current_view, current_panel_view) {
			for (i=0; i<this.panels.length; i++) {
				if (this.panels[i].name == current_view) {
					for (j=0; j<this.panels[i].views.length; j++) {
						if (this.panels[i].views[j].name == current_panel_view) {
							return true
						} else {
							return false
						}
					}
				}
			}
		},
		getPanelViewForm: function(current_panel_view) {
			for (i=0; i < this.panels.length; i++) {
				if (this.panels[i].name == this.current_view) {
					for (j=0; j<this.panels[i].views.length; j++) {
						if (this.panels[i].views[j].name == current_panel_view) {
							return this.panels[i].views[j]
						} else {
							return null
						}
					}
				}
			}
		}
	},
	computed: {
		allPanelNames: function() {
			panel_names_array = []
			for (i = 0; i < this.panels.length; i++) {
				panel_names_array.push(this.panels[i].name)
			}
			return panel_names_array
		},
		currentPanelMenus: function() {
			for (i = 0; i < this.panels.length; i++) {
				if (this.panels[i].name == this.current_view) {
					return this.panels[i].menus
				}
			}
		},
		panelForms: function() {
			for (i=0; i < this.panels.length; i++) {
				if (this.panels[i].name == this.current_view) {
					for (j=0; j<this.panels[i].views.length; j++) {
						if (this.panels[i].views[j].type == 'Form') {
							return this.panels[i].views[j]
						} else {
							return null
						}
					}
				}
			}
		}
	},
	created: function() {
		bus.$on('panel-selected', function(panel) {
			this.current_view = panel
			this.open_main_dropdown = false
			this.open_sub_dropdown_name = ''
		}.bind(this)),
		bus.$on('panel-view-selected', function(panel_view) {
			this.current_panel_view = panel_view
		}.bind(this))
	}
})